#!/usr/bin/env node
/**
 * NORMALISER LES IMAGES — LE CADRAGE, LE SEUL CHAMP QUI NE SE NÉGOCIE PAS
 *
 * Le site attend du **5 / 7** : 1000 × 1400. Un outil de génération rend ce
 * qu'il veut — 1024 × 1536, 864 × 1216, un carré. La déclaration exige des
 * dimensions justes : `largeur * 7 === hauteur * 5`. Ce script met le fichier
 * au format, et ne touche à rien d'autre.
 *
 *   node scripts/normaliser-images.mjs            tout `images/`
 *   node scripts/normaliser-images.mjs 01-01       un seul jour
 *   node scripts/normaliser-images.mjs --sec        n'écrit rien, montre
 *
 * La méthode, dans l'ordre :
 *   1. recadrer au centre au plus près du 5 / 7 (on perd quelques pixels de
 *      bord, jamais de matière au centre) ;
 *   2. redimensionner à 1000 × 1400 ;
 *   3. qualité 88, métadonnées retirées — un JPEG d'image, rien de plus.
 *
 * Le recadrage n'est pas une coquetterie : c'est la seule façon d'obtenir un
 * ratio **exact** sans étirer l'image. On ne déforme jamais un visage pour
 * satisfaire un champ.
 *
 * Il faut ImageMagick (`convert`) dans le PATH. Si l'outil manque, le script
 * dit lequel des fichiers n'est pas au format et s'arrête là.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { RACINE, PLANS, cheminLocal } from './bibliotheque.mjs';

const LARGEUR = 1000;
const HAUTEUR = 1400;
const QUALITE = 88;

const args = process.argv.slice(2);
const sec = args.includes('--sec');
const jourVoulu = args.find((a) => /^\d{2}-\d{2}$/.test(a)) ?? null;

/** ImageMagick présent ? Sinon on le dit tout de suite, et on ne fait rien. */
let outil = null;
for (const nom of ['magick', 'convert']) {
  try {
    execFileSync(nom, ['-version'], { stdio: 'ignore' });
    outil = nom;
    break;
  } catch {
    /* on essaie le suivant */
  }
}
if (!outil) {
  console.error('ImageMagick est introuvable (`magick` ou `convert`).');
  console.error('Rien n’a été touché : les fichiers ne sont pas au format 5 / 7.');
  process.exit(1);
}

/** Les dimensions d'un fichier, ou `null` si ImageMagick ne le lit pas. */
function dimensions(fichier) {
  try {
    // ImageMagick 6 comme 7 : on lit les dimensions sur le pseudo-fichier `info:`.
    const sortie = execFileSync(outil, [fichier, '-format', '%w %h', 'info:'], { encoding: 'utf8' });
    const [l, h] = sortie.trim().split(/\s+/).map(Number);
    return Number.isInteger(l) && Number.isInteger(h) ? { l, h } : null;
  } catch {
    return null;
  }
}

/**
 * Les dimensions du recadrage : le plus grand rectangle au ratio 5 / 7 qui
 * tient dans l'image, centré. On rogne sur l'axe qui dépasse, un point de plus
 * si le compte est impair — jamais les deux.
 */
function recadrage(l, h) {
  const cible = LARGEUR / HAUTEUR;
  const largeur = Math.min(l, Math.round(h * cible));
  const hauteur = Math.min(h, Math.round(l / cible));
  return { largeur, hauteur };
}

const refaire = (fichier) => {
  const dim = dimensions(fichier);
  if (!dim) return { etat: 'illisible' };
  if (dim.l === LARGEUR && dim.h === HAUTEUR) return { etat: 'bon', dim };

  const { largeur, hauteur } = recadrage(dim.l, dim.h);
  if (!sec) {
    execFileSync(outil, [
      fichier,
      '-strip',
      '-gravity', 'center',
      '-crop', `${largeur}x${hauteur}+0+0`,
      '+repage',
      '-resize', `${LARGEUR}x${HAUTEUR}!`,
      '-quality', String(QUALITE),
      fichier,
    ]);
  }
  return { etat: sec ? 'à refaire' : 'refait', dim, apres: { l: LARGEUR, h: HAUTEUR } };
};

const jours = readdirSync(join(RACINE, 'images'))
  .filter((n) => /^\d{2}-\d{2}$/.test(n))
  .filter((n) => !jourVoulu || n === jourVoulu)
  .sort();

const faits = [];
const bons = [];
const rates = [];
let total = 0;

for (const jour of jours) {
  for (const plan of PLANS) {
    for (const nom of [plan, ...['2', '3'].map((r) => `${plan}-${r}`)]) {
      const fichier = cheminLocal(`images/${jour}/${nom}.jpg`);
      if (!existsSync(fichier) || !statSync(fichier).isFile()) continue;
      total += 1;
      const r = refaire(fichier);
      if (r.etat === 'bon') bons.push(`images/${jour}/${nom}.jpg`);
      else if (r.etat === 'illisible') rates.push(`images/${jour}/${nom}.jpg`);
      else faits.push({ chemin: `images/${jour}/${nom}.jpg`, ...r });
    }
  }
}

if (!total) {
  console.log(
    jourVoulu ? `Aucune image pour ${jourVoulu}.` : 'Aucune image dans `images/` : il n’y a rien à normaliser.',
  );
  process.exit(0);
}

if (faits.length) {
  console.log(`${sec ? 'À REFAIRE' : 'REFAIT'} — ${faits.length} fichier(s) au format ${LARGEUR} × ${HAUTEUR}`);
  for (const f of faits) {
    console.log(`  ${f.chemin} : ${f.dim.l}×${f.dim.h} → ${LARGEUR}×${HAUTEUR}`);
  }
}
if (bons.length) console.log(`Déjà au format — ${bons.length} fichier(s).`);
if (rates.length) {
  console.log(`Illisible(s) — ${rates.length} fichier(s) :`);
  for (const f of rates) console.log(`  ${f}`);
}

console.log(
  `\n${total} image(s) vue(s) · ${faits.length} ${sec ? 'à refaire' : 'refaite(s)'} · ${bons.length} déjà juste${rates.length ? ` · ${rates.length} illisible(s)` : ''}.`,
);
if (!sec && faits.length) {
  console.log('Appeler `npm run verifier` : le cadrage déclaré doit maintenant tenir.');
}
process.exit(rates.length ? 1 : 0);
