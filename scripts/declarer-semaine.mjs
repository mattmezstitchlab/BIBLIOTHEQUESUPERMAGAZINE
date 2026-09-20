#!/usr/bin/env node
/**
 * DÉCLARER UNE IMAGE DE SEMAINE — LA MÊME RÈGLE, LES TREIZE CHAMPS
 *
 * La déclaration fait partie de l'image. Ici, dix champs sont demandés par le
 * brief — semaine, chapitre, titre, univers, saison, style, sujet,
 * dominante_color, description, mots_cles — et trois s'ajoutent parce qu'ils se
 * lisent au lieu de se dire : **fichier**, **largeur**, **hauteur**.
 *
 * Ce que l'outil prend dans les règles, sans qu'on puisse se tromper :
 *   - la **semaine** et le **chapitre**, lus dans le nom (`images/semaine-07/03-lieux.jpg`) ;
 *   - le **titre**, la **saison** et le **style** : ceux du plan de la semaine ;
 *   - l'**univers** : celui du chapitre, ou « la couverture » ;
 *   - la **largeur** et la **hauteur**, lues dans l'en-tête JPEG.
 *
 * Ce qui se dit à la main, parce que c'est un regard :
 *   --sujet        ce qu'on voit, en quelques mots
 *   --description  une phrase : ce que l'image montre, et pourquoi elle est là
 *   --mots-cles    trois à six mots-clés, séparés par des virgules
 *   --couleur      la dominante réelle, en #RRGGBB (par défaut : la palette du plan)
 *
 * Exemple :
 *
 *   node scripts/declarer-semaine.mjs images/semaine-01/05-fete.jpg \
 *     --sujet "cuivres et fumée, lumière rasante" \
 *     --description "La fête en noir et blanc : un feu d'artifice de lumière, aucun visage." \
 *     --mots-cles "cuivres, fumée, contre-jour"
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { RACINE } from './bibliotheque.mjs';
import { CHAPITRES, COUVERTURE, FORMAT, analyserNomDeSemaine, cadrageJuste, chapitreParSlug, semaineComplete } from './semaines.mjs';

/* ————————————————————————————— LES ARGUMENTS ————————————————————————————— */

const args = process.argv.slice(2);
const chemin = args.find((a) => !a.startsWith('--'));
const option = (nom, defaut = null) => {
  const i = args.indexOf(`--${nom}`);
  return i === -1 ? defaut : (args[i + 1] ?? defaut);
};
const drapeau = (nom) => args.includes(`--${nom}`);

if (!chemin || drapeau('aide') || drapeau('help')) {
  console.log('Usage : node scripts/declarer-semaine.mjs images/semaine-NN/<chapitre>.jpg --sujet "…" --description "…" --mots-cles "a, b, c" [--couleur "#RRGGBB"]');
  process.exit(chemin ? 0 : 1);
}

const refus = (raison) => {
  console.error(`Refusé — ${raison}`);
  process.exit(1);
};

/* ————————————————— LE NOM DIT LA SEMAINE ET LE CHAPITRE ————————————————— */

const relatif = chemin.replace(/^\.?\//, '').replace(/^.*?images\//, 'images/');
if (!/^images\/semaine-\d{2}\/.+\.jpg$/.test(relatif)) {
  refus(`« ${chemin} » ne suit pas la convention images/semaine-NN/<chapitre>.jpg.`);
}

const [, dossier, fichier] = relatif.split('/');
const numero = Number(dossier.slice('semaine-'.length));
const semaine = semaineComplete(numero);
if (!semaine) refus(`« ${dossier} » n'est pas une semaine de 1 à 54.`);

const analyse = analyserNomDeSemaine(fichier);
const slot = analyse?.slot;
const admis = [COUVERTURE, ...CHAPITRES.map((c) => c.slug)];
if (!slot || !admis.includes(slot)) {
  refus(`« ${fichier} » n'est pas un des huit noms admis : ${admis.map((s) => `${s}.jpg`).join(', ')}`);
}

const absolu = join(RACINE, relatif);
if (!existsSync(absolu)) refus(`le fichier ${relatif} n'existe pas sur le disque.`);

/* ———————————————— LE CADRAGE SE LIT DANS LE FICHIER ———————————————— */

function dimensionsJpeg(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marqueur = buf[i + 1];
    if (marqueur === 0xff || marqueur === 0x01 || (marqueur >= 0xd0 && marqueur <= 0xd9)) {
      i += 2;
      continue;
    }
    const taille = buf.readUInt16BE(i + 2);
    const debutDeFrame = marqueur >= 0xc0 && marqueur <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marqueur);
    if (debutDeFrame) return { hauteur: buf.readUInt16BE(i + 5), largeur: buf.readUInt16BE(i + 7) };
    if (marqueur === 0xda) break;
    i += 2 + taille;
  }
  return null;
}

const dim = dimensionsJpeg(readFileSync(absolu));
if (!dim) refus(`${relatif} n'est pas un JPEG lisible.`);
if (!cadrageJuste(dim.largeur, dim.hauteur)) {
  refus(`le cadrage : ${dim.largeur}×${dim.hauteur} n'est pas du ${FORMAT.nom} (${FORMAT.ratio}) — appeler \`npm run normaliser\` avant de déclarer.`);
}

/* ——————————————————————— LES CHAMPS QUI SE DISENT ——————————————————————— */

const sujet = option('sujet');
const description = option('description');
const motsCles = (option('mots-cles') ?? '').split(',').map((m) => m.trim()).filter(Boolean);
const couleur = (option('couleur') ?? semaine.palette[0]).trim();

if (!sujet || !sujet.trim()) refus('le sujet est un des champs : donner --sujet "…".');
if (!description || description.trim().length < 20) refus('la description est un des champs, et elle tient en une phrase : --description "…".');
if (motsCles.length < 3) refus('il faut au moins trois mots-clés : --mots-cles "a, b, c".');
if (!/^#[0-9A-Fa-f]{6}$/.test(couleur)) refus(`la dominante « ${couleur} » n'est pas un #RRGGBB.`);

const chapitre = chapitreParSlug(slot);
const univers = chapitre ? chapitre.nom : 'la couverture';

/* ———————————————————————————— L'ÉCRITURE ———————————————————————————— */

const fichierManifeste = join(RACINE, 'manifeste-semaines.json');
const manifeste = JSON.parse(readFileSync(fichierManifeste, 'utf8'));

if (manifeste.images.some((i) => i.fichier === relatif)) {
  refus(`${relatif} est déjà déclarée (retirer la ligne du manifeste pour la refaire).`);
}

const declaration = {
  semaine: numero,
  chapitre: slot,
  univers,
  titre: semaine.titre,
  fichier: relatif,
  saison: semaine.saison,
  style: semaine.style,
  sujet: sujet.trim(),
  dominante_color: couleur.toUpperCase(),
  description: description.trim(),
  mots_cles: motsCles,
  largeur: dim.largeur,
  hauteur: dim.hauteur,
};

manifeste.images.push(declaration);
manifeste.images.sort((a, b) => a.fichier.localeCompare(b.fichier));
writeFileSync(fichierManifeste, `${JSON.stringify(manifeste, null, 2)}\n`);

console.log(`Déclaré — ${relatif}`);
console.log(`  semaine ${String(numero).padStart(2, '0')} · ${slot} · ${univers}`);
console.log(`  ${semaine.titre} · ${semaine.saison} · ${semaine.style}`);
console.log(`  ${dim.largeur}×${dim.hauteur} (${FORMAT.nom}) · dominante ${declaration.dominante_color}`);
console.log(`  ${sujet.trim()}`);
console.log(`\n${manifeste.images.length} image(s) au manifeste des semaines. Terminer par : npm run semaines:verifier`);
