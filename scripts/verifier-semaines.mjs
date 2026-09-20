#!/usr/bin/env node
/**
 * VÉRIFIER LA BIBLIOTHÈQUE DES SEMAINES — LE MANIFESTE EST-IL HONNÊTE ?
 *
 *   node scripts/verifier-semaines.mjs
 *
 * Le même principe que le vérificateur des jours : **une image posée sans sa
 * déclaration ne sert à rien**, et une déclaration qui ne tient pas ses
 * promesses est une erreur, pas un détail.
 *
 * Ce qui est vérifié, pour chaque image déclarée :
 *   - le **chapitre** est un des huit admis (la couverture, ou un des sept) ;
 *   - le **fichier** suit la convention `images/semaine-NN/<chapitre>.jpg` et
 *     correspond au chapitre qu'il déclare ;
 *   - la **semaine** existe (1 à 54) et la déclaration dit la même chose que
 *     le chemin ;
 *   - le **titre** est celui du plan, la **saison** est celle de la semaine —
 *     ces deux-là ne se choisissent pas, ils se calculent ;
 *   - la **dominante** est un `#RRGGBB` ;
 *   - le **cadrage** est du 5 / 7 (`largeur * 7 === hauteur * 5`) ;
 *   - le **sujet**, la **description** et les **mots-clés** sont renseignés ;
 *   - le **fichier existe** vraiment sur le disque ;
 *   - et l'inverse : toute image posée sur le disque a sa déclaration.
 *
 * Sortie 0 si tout tient, 1 s'il y a une erreur. Un avertissement ne casse pas
 * la sortie — il se règle avant de livrer.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { RACINE } from './bibliotheque.mjs';
import { CHAPITRES, COUVERTURE, FORMAT, IMAGES_DE_LA_SEMAINE, NOMBRE_DE_SEMAINES, cadrageJuste, semaineParNumero, saisonDeLaSemaine, cheminSemaine } from './semaines.mjs';

const erreurs = [];
const avertissements = [];

/* ————————————————————————————— LE MANIFESTE ————————————————————————————— */

const fichierManifeste = join(RACINE, 'manifeste-semaines.json');
if (!existsSync(fichierManifeste)) {
  console.error('manifeste-semaines.json est absent.');
  process.exit(1);
}
const manifeste = JSON.parse(readFileSync(fichierManifeste, 'utf8'));
const images = Array.isArray(manifeste.images) ? manifeste.images : [];
const slugs = IMAGES_DE_LA_SEMAINE;

/* ——————————————————————— CE QUE DIT LE MANIFESTE ——————————————————————— */

const vus = new Set();

for (const img of images) {
  const ou = img.fichier ?? '(sans fichier)';
  const dire = (message) => erreurs.push(`${ou} — ${message}`);

  // la semaine
  if (!Number.isInteger(img.semaine) || img.semaine < 1 || img.semaine > NOMBRE_DE_SEMAINES) {
    dire(`la semaine doit être un entier de 1 à ${NOMBRE_DE_SEMAINES}`);
    continue;
  }

  // le chapitre
  if (!slugs.includes(img.chapitre)) {
    dire(`le chapitre « ${img.chapitre} » n'existe pas — les huit admis : ${slugs.join(', ')}`);
    continue;
  }

  // le chemin, et sa cohérence avec la semaine et le chapitre
  const attendu = `images/${cheminSemaine(img.semaine)}/${img.chapitre}.jpg`;
  if (img.fichier !== attendu) dire(`le chemin écrit ne suit pas la convention : attendu ${attendu}`);

  // un seul rang par semaine et par chapitre
  const cle = `${img.semaine}/${img.chapitre}`;
  if (vus.has(cle)) erreurs.push(`déclaration en double : semaine ${img.semaine}, ${img.chapitre}`);
  vus.add(cle);

  // ce qui se calcule ne se choisit pas
  const plan = semaineParNumero(img.semaine);
  if (plan && img.titre !== plan.titre) dire(`le titre doit être celui du plan : « ${plan.titre} »`);
  const saison = saisonDeLaSemaine(img.semaine);
  if (img.saison !== saison) dire(`la saison de la semaine ${img.semaine} est « ${saison} »`);

  // les champs dits
  const chapitre = CHAPITRES.find((c) => c.slug === img.chapitre);
  const universAttendu = chapitre ? chapitre.nom : 'la couverture';
  if (!img.univers || typeof img.univers !== 'string') dire('l’univers est vide');
  else if (img.univers !== universAttendu) dire(`l’univers du chapitre ${img.chapitre} est « ${universAttendu} »`);

  if (!img.style || typeof img.style !== 'string') dire('le style est vide');
  if (!img.sujet || typeof img.sujet !== 'string') dire('le sujet est vide');
  if (!img.description || typeof img.description !== 'string' || img.description.trim().length < 20) {
    dire('la description manque, ou tient en moins d’une phrase');
  }
  if (!Array.isArray(img.mots_cles) || img.mots_cles.length < 3) {
    dire('il faut au moins trois mots-clés');
  } else if (img.mots_cles.some((m) => typeof m !== 'string' || !m.trim())) {
    dire('un mot-clé est vide');
  }

  // la couleur
  if (typeof img.dominante_color !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(img.dominante_color)) {
    dire(`la dominante « ${img.dominante_color} » n’est pas un #RRGGBB`);
  }

  // le cadrage — A4 portrait, ce n'est pas du 5 / 7
  if (!Number.isInteger(img.largeur) || !Number.isInteger(img.hauteur) || img.largeur <= 0 || img.hauteur <= 0) {
    dire('largeur et hauteur doivent être des entiers positifs');
  } else if (!cadrageJuste(img.largeur, img.hauteur)) {
    dire(`le cadrage : ${img.largeur}×${img.hauteur} n’est pas du ${FORMAT.nom} (${FORMAT.ratio})`);
  } else if (img.largeur !== FORMAT.largeur || img.hauteur !== FORMAT.hauteur) {
    avertissements.push(`${ou} — ${img.largeur}×${img.hauteur} est bien du ${FORMAT.nom}, mais le format de la maison est ${FORMAT.largeur}×${FORMAT.hauteur}`);
  }

  // le fichier existe-t-il ?
  if (!existsSync(join(RACINE, img.fichier))) dire('le fichier déclaré est absent du disque');
}

/* ——————————————————— CE QUE DIT LE DISQUE, EN RETOUR ——————————————————— */

const dossiers = readdirSync(join(RACINE, 'images')).filter((n) => /^semaine-\d{2}$/.test(n));
for (const dossier of dossiers) {
  const chemin = join(RACINE, 'images', dossier);
  if (!statSync(chemin).isDirectory()) continue;
  for (const entree of readdirSync(chemin)) {
    if (entree.startsWith('.')) continue;
    if (!entree.endsWith('.jpg')) {
      avertissements.push(`images/${dossier}/${entree} — fichier inattendu : seuls les huit .jpg de la semaine comptent`);
      continue;
    }
    const slug = entree.replace(/\.jpg$/, '');
    if (!slugs.includes(slug)) {
      avertissements.push(`images/${dossier}/${entree} — ce nom n'est pas un des huit : ${slugs.join(', ')}`);
      continue;
    }
    const numero = Number(dossier.slice('semaine-'.length));
    if (!vus.has(`${numero}/${slug}`)) {
      avertissements.push(`images/${dossier}/${entree} — posée sans déclaration : une image sans ses champs ne sert à rien`);
    }
  }
}

/* ————————————————————————————— LE VERDICT ————————————————————————————— */

const semainesTouchees = new Set(images.map((i) => i.semaine));
const completes = [...semainesTouchees].filter((n) => slugs.every((s) => vus.has(`${n}/${s}`)));

console.log('LES 54 SEMAINES — LE VERDICT\n');
console.log(`${images.length} déclaration(s) · ${semainesTouchees.size} semaine(s) touchée(s) · ${completes.length} complète(s)`);
console.log(`Attendu à terme : ${NOMBRE_DE_SEMAINES} semaines × ${slugs.length} images = ${NOMBRE_DE_SEMAINES * slugs.length} images.\n`);

if (avertissements.length) {
  console.log(`Avertissements —`);
  for (const a of avertissements) console.log(`  ⚠ ${a}`);
  console.log();
}

if (erreurs.length) {
  console.log(`Erreurs —`);
  for (const e of erreurs) console.log(`  ✗ ${e}`);
  console.log(`\n${erreurs.length} erreur(s) : le manifeste ne tient pas.`);
  process.exit(1);
}

console.log('Le manifeste tient : chaque déclaration dit sa semaine, son chapitre, sa couleur,');
console.log('son cadrage et ce qu’on y voit ; chaque fichier déclaré existe ; chaque image');
console.log('posée est déclarée à sa place.');
console.log('Une image manquante ne casse jamais une page — les 54 magazines se remplissent.');
if (completes.length === NOMBRE_DE_SEMAINES) console.log('\nLes 54 magazines sont complets.');
