#!/usr/bin/env node
/**
 * NOIR ET BLANC — QUAND LE FIL D'UNE SEMAINE L'EXIGE
 *
 *   node scripts/noir-et-blanc.mjs images/semaine-01/cover.jpg …
 *   node scripts/noir-et-blanc.mjs --gris images/semaine-01/*.jpg
 *   node scripts/noir-et-blanc.mjs --sec images/semaine-01/cover.jpg
 *
 * Certaines semaines ont un fil qui se voit : « tout le numéro en noir et
 * blanc, sauf une seule image ». Un fil qui dépend du bon vouloir d'un outil de
 * génération n'est pas un fil, c'est un vœu. Cet outil **le rend vrai** : il
 * convertit les fichiers qu'on lui donne en niveaux de gris, et rien d'autre —
 * ni recadrage, ni redimensionnement (c'est le métier de `npm run normaliser`).
 *
 * La conversion est faite par ImageMagick, en luminance, sans modification de
 * la courbe : une image en noir et blanc, pas une image « désaturée » qui garde
 * une teinte dans les ombres.
 */

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { basename, isAbsolute, join } from 'node:path';

import { RACINE } from './bibliotheque.mjs';

const args = process.argv.slice(2);
const sec = args.includes('--sec');
const fichiers = args.filter((a) => !a.startsWith('--'));

if (!fichiers.length) {
  console.log('Usage : node scripts/noir-et-blanc.mjs [--sec] <fichier.jpg> [<fichier.jpg> …]');
  process.exit(1);
}

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
  process.exit(1);
}

const faits = [];
const rates = [];

for (const brut of fichiers) {
  const chemin = isAbsolute(brut) ? brut : join(RACINE, brut);
  if (!existsSync(chemin)) {
    rates.push(`${brut} — absent`);
    continue;
  }
  const relatif = chemin.startsWith(RACINE) ? chemin.slice(RACINE.length + 1) : basename(chemin);
  if (!sec) {
    // `-colorspace Gray` calcule une vraie luminance ; `-type Grayscale` la fige au format.
    execFileSync(outil, [chemin, '-colorspace', 'Gray', '-type', 'Grayscale', '-strip', chemin]);
  }
  faits.push(relatif);
}

if (faits.length) {
  console.log(`${sec ? 'À CONVERTIR' : 'CONVERTI'} — ${faits.length} fichier(s) en noir et blanc`);
  for (const f of faits) console.log(`  ${f}`);
}
if (rates.length) {
  console.log(`${rates.length} fichier(s) ignoré(s) :`);
  for (const r of rates) console.log(`  ${r}`);
}
if (!sec && faits.length) console.log('\nRien d’autre n’a été touché : ni cadrage, ni dimensions. Passer `npm run normaliser` ensuite.');
process.exit(rates.length ? 1 : 0);
