#!/usr/bin/env node
/**
 * DÉCLARER UNE IMAGE — LES CINQ CHAMPS, ET LE CADRAGE LU DANS LE FICHIER
 *
 * La déclaration fait partie de l'image : une image qui ne peut pas déclarer
 * ses cinq champs ne sert à rien. Cet outil ne remplace pas le jugement — la
 * lumière, la matière, ce que l'image contient se décident en la regardant — il
 * supprime tout ce qui peut être *lu* au lieu d'être *dit*.
 *
 * Ce qui vient du fichier, sans qu'on puisse se tromper :
 *   - le **jour** et le **plan**, lus dans le nom (`images/09-21/midi-2.jpg`) ;
 *   - le **rang** — premier, candidate 2, candidate 3 ;
 *   - la **largeur** et la **hauteur**, lues dans l'en-tête JPEG ;
 *   - la **couleur** par défaut : celle du jour, telle que le casting la donne.
 *
 * Ce qui se dit à la main, parce que c'est un regard :
 *   --lumiere   ce que la lumière fait, en trois mots
 *   --contient  ce qu'on voit, séparé par des virgules
 *   --note      la raison d'être de cette candidate (facultatif)
 *   --couleur   à ne donner que si la dominante réelle s'écarte du jour
 *
 * Exemple :
 *
 *   node scripts/declarer-image.mjs images/09-21/aube.jpg \
 *     --lumiere "froide, rasante, bleu d'avant le jour" \
 *     --contient "matthieu, portrait, comptoir nu" \
 *     --note "l'aube — l'image de référence du jour"
 *
 * L'outil refuse une image absente, un jour qui n'existe pas, un plan inconnu,
 * un doublon, un cadrage qui n'est pas du 5 / 7, et une image illisible.
 * Rien n'entre au manifeste par accident.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { RACINE, PLANS, analyserFichier, estUnVraiJour, lireCasting, lireManifeste } from './bibliotheque.mjs';

/* ————————————————————————————— LES ARGUMENTS ————————————————————————————— */

const args = process.argv.slice(2);
const chemin = args.find((a) => !a.startsWith('--'));
const option = (nom, defaut = null) => {
  const i = args.indexOf(`--${nom}`);
  return i === -1 ? defaut : (args[i + 1] ?? defaut);
};
const drapeau = (nom) => args.includes(`--${nom}`);

const lumiere = option('lumiere');
const contientBrut = option('contient');
const note = option('note');
const couleurForcee = option('couleur');

if (!chemin || drapeau('aide') || drapeau('help')) {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('*/')[0].replace(/^#!.*\n\/\*\*/, '').replace(/^ \* ?/gm, '').trim());
  process.exit(chemin ? 0 : 1);
}

const refus = (raison) => {
  console.error(`Refusé — ${raison}`);
  process.exit(1);
};

/* ————————————————————————— LE NOM DIT LE JOUR ET LE PLAN ————————————————————————— */

const relatif = chemin.replace(/^\.?\//, '').replace(/^.*?images\//, 'images/');
if (!/^images\/\d{2}-\d{2}\/.+\.jpg$/.test(relatif)) {
  refus(`« ${chemin} » ne suit pas la convention images/MM-JJ/slot.jpg (et le format .jpg).`);
}

const [, jour, fichier] = relatif.split('/');
if (!estUnVraiJour(jour)) refus(`« ${jour} » n'est pas un jour de l'année.`);

const { slot, rang } = analyserFichier(fichier);
if (!slot || !PLANS.includes(slot)) {
  refus(`« ${fichier} » n'est pas un des six plans : ${PLANS.join(', ')} — la nuit n'a pas d'image.`);
}

const absolu = join(RACINE, relatif);
if (!existsSync(absolu)) refus(`le fichier ${relatif} n'existe pas sur le disque.`);

/* —————————————————— LE CADRAGE SE LIT DANS L'EN-TÊTE DU FICHIER —————————————————— */

/** Les dimensions d'un JPEG, lues dans ses marqueurs — sans dépendre d'un outil. */
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
    if (debutDeFrame) {
      return { hauteur: buf.readUInt16BE(i + 5), largeur: buf.readUInt16BE(i + 7) };
    }
    if (marqueur === 0xda) break;
    i += 2 + taille;
  }
  return null;
}

const dim = dimensionsJpeg(readFileSync(absolu));
if (!dim) refus(`${relatif} n'est pas un JPEG lisible.`);
if (dim.largeur * 7 !== dim.hauteur * 5) {
  refus(
    `le cadrage : ${dim.largeur}×${dim.hauteur} n'est pas du 5 / 7 — appeler \`npm run normaliser\` avant de déclarer.`,
  );
}

/* ————————————————————— LA COULEUR PAR DÉFAUT EST CELLE DU JOUR ————————————————————— */

const casting = lireCasting();
const fondDuJour = casting.fonds.find((f) => f.jour === jour);
const couleur = (couleurForcee ?? fondDuJour?.couleur ?? '').trim();
if (!/^#[0-9A-Fa-f]{6}$/.test(couleur)) {
  refus(
    couleurForcee
      ? `la couleur « ${couleur} » n'est pas un #RRGGBB.`
      : `aucune couleur pour ${jour} dans le casting : donner --couleur "#RRGGBB".`,
  );
}

if (!lumiere || !lumiere.trim()) refus('la lumière est un des cinq champs : donner --lumiere "…".');

const contient = (contientBrut ?? '')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);
if (!contient.length) refus('ce que contient l’image est un des cinq champs : donner --contient "…, …".');

if (rang > 1) {
  const premier = join(RACINE, `images/${jour}/${slot}.jpg`);
  if (!existsSync(premier)) {
    console.error(
      `Avertissement — ${fichier} est une candidate (rang ${rang}) et le premier rang, ${slot}.jpg, n'existe pas encore : c'est lui qu'on veut, les candidates viennent après.`,
    );
  }
}

/* ———————————————————————————— L'ÉCRITURE ———————————————————————————— */

const manifeste = lireManifeste();
const deja = manifeste.images.find((i) => i.fichier === relatif);
if (deja) refus(`${relatif} est déjà déclarée (retirer la ligne du manifeste pour la refaire).`);

const declaration = {
  fichier: relatif,
  moment: slot,
  lumiere: lumiere.trim(),
  couleur: couleur.toUpperCase().replace('#', '#'),
  largeur: dim.largeur,
  hauteur: dim.hauteur,
  contient,
  ...(note && note.trim() ? { note: note.trim() } : {}),
};

manifeste.images.push(declaration);
manifeste.images.sort((a, b) => a.fichier.localeCompare(b.fichier));
writeFileSync(join(RACINE, 'manifeste.json'), `${JSON.stringify(manifeste, null, 2)}\n`);

console.log(`Déclaré — ${relatif}`);
console.log(`  moment ${slot} · rang ${rang} · ${dim.largeur}×${dim.hauteur} (5 / 7) · couleur ${couleur}`);
console.log(`  lumière ${declaration.lumiere}`);
console.log(`  contient ${contient.join(', ')}`);
console.log(`\n${manifeste.images.length} image(s) au manifeste. Terminer par : npm run verifier && npm run relever`);
