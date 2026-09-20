#!/usr/bin/env node
/**
 * LES LOTS DES SEMAINES — CE QU'IL FAUT PRODUIRE, DANS QUEL ORDRE
 *
 *   node scripts/lots-semaines.mjs etat        où en est la bibliothèque
 *   node scripts/lots-semaines.mjs semaine 07  ce que demande la semaine 07
 *   node scripts/lots-semaines.mjs prochaine   la prochaine semaine incomplète
 *
 * Un lot = **une semaine = huit images** : sa couverture, puis ses sept
 * chapitres. C'est l'unité naturelle du nouveau modèle — un magazine se produit
 * d'un bloc, sinon ses sept chapitres ne se répondent pas.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { RACINE, analyserFichier } from './bibliotheque.mjs';
import { CHAPITRES, COUVERTURE, IMAGES_DE_LA_SEMAINE, NOMBRE_DE_SEMAINES, SAISON_EN_FRANCAIS, cheminSemaine, plageDates, saisonDeLaSemaine, semaineComplete } from './semaines.mjs';

const args = process.argv.slice(2);
const ordre = args[0] ?? 'etat';

/** Ce qui est posé sur le disque, semaine par semaine. */
function etatDisque() {
  const parSemaine = new Map();
  const dossier = join(RACINE, 'images');
  if (!existsSync(dossier)) return parSemaine;
  for (const entree of readdirSync(dossier)) {
    if (!/^semaine-\d{2}$/.test(entree)) continue;
    const numero = Number(entree.slice('semaine-'.length));
    const poses = new Set();
    for (const fichier of readdirSync(join(dossier, entree))) {
      if (fichier.startsWith('.')) continue;
      const { slot } = analyserFichier(fichier);
      if (slot) poses.add(slot);
    }
    parSemaine.set(numero, poses);
  }
  return parSemaine;
}

const disque = etatDisque();
const debut = (n) => disque.get(n)?.size ?? 0;
const complete = (n) => IMAGES_DE_LA_SEMAINE.every((s) => disque.get(n)?.has(s));

/* ——————————————————————————————— L'ÉTAT ——————————————————————————————— */

if (ordre === 'etat') {
  const touchees = [...disque.keys()].filter((n) => debut(n) > 0).sort((a, b) => a - b);
  const completes = touchees.filter(complete);
  const images = touchees.reduce((total, n) => total + debut(n), 0);
  const prochaine = [...Array(NOMBRE_DE_SEMAINES).keys()].map((i) => i + 1).find((n) => !complete(n));

  console.log('\nLA BIBLIOTHÈQUE DES 54 SEMAINES — L’ÉTAT\n');
  console.log(`Semaines complètes   ${completes.length} / ${NOMBRE_DE_SEMAINES}`);
  console.log(`Semaines entamées    ${touchees.length - completes.length}`);
  console.log(`Images livrées       ${images} / ${NOMBRE_DE_SEMAINES * IMAGES_DE_LA_SEMAINE.length}`);
  const manifeste = JSON.parse(readFileSync(join(RACINE, 'manifeste-semaines.json'), 'utf8'));
  console.log(`Manifeste            ${manifeste.images.length} déclaration(s)`);
  if (completes.length) {
    console.log(`\nComplètes — ${completes.map((n) => `semaine-${String(n).padStart(2, '0')}`).join(', ')}`);
  }
  if (touchees.length && touchees.length !== completes.length) {
    console.log(`Entamées  — ${touchees.filter((n) => !complete(n)).map((n) => `semaine-${String(n).padStart(2, '0')} (${debut(n)}/8)`).join(', ')}`);
  }
  if (prochaine) {
    const s = semaineComplete(prochaine);
    const d = plageDates(prochaine);
    console.log(`\nProchain lot   semaine ${String(prochaine).padStart(2, '0')} — ${s.titre} (${d.debut} au ${d.fin}, ${SAISON_EN_FRANCAIS[s.saison]})`);
    console.log(`               node scripts/lots-semaines.mjs semaine ${prochaine}`);
  } else {
    console.log('\nLes 54 magazines sont complets.');
  }
  console.log();
  process.exit(0);
}

/* ——————————————————————— LA PROCHAINE SEMAINE ——————————————————————— */

if (ordre === 'prochaine') {
  const n = [...Array(NOMBRE_DE_SEMAINES).keys()].map((i) => i + 1).find((x) => !complete(x));
  if (!n) {
    console.log('Les 54 magazines sont complets — rien à produire.');
    process.exit(0);
  }
  args[0] = 'semaine';
  args[1] = String(n);
}

/* ————————————————————————— UNE SEMAINE ————————————————————————— */

if (ordre !== 'semaine' || !Number.isInteger(Number(args[1]))) {
  console.log('Usage :\n  node scripts/lots-semaines.mjs etat\n  node scripts/lots-semaines.mjs semaine 07\n  node scripts/lots-semaines.mjs prochaine');
  process.exit(1);
}

const n = Number(args[1]);
const s = semaineComplete(n);
if (!s) {
  console.log(`La semaine ${n} n'existe pas — de 1 à ${NOMBRE_DE_SEMAINES}.`);
  process.exit(1);
}

console.log(`\nSEMAINE ${String(n).padStart(2, '0')} — ${s.titre.toUpperCase()}`);
console.log(`${s.dates.debut} au ${s.dates.fin} · ${SAISON_EN_FRANCAIS[s.saison]} · ${s.style}`);
console.log(`palette \`${s.palette[0]}\` \`${s.palette[1]}\`\n`);
console.log(`LA COUVERTURE — ${s.couverture}`);
console.log(`LE FIL — ${s.fil}\n`);
console.log('LES HUIT IMAGES\n');

for (const slug of IMAGES_DE_LA_SEMAINE) {
  const chapitre = CHAPITRES.find((c) => c.slug === slug);
  const pose = disque.get(n)?.has(slug);
  const etat = pose ? 'posée' : 'à poser';
  const chemin = `images/${cheminSemaine(n)}/${slug}.jpg`;
  console.log(`  ${etat.padEnd(8)} ${chemin}`);
  console.log(`           ${chapitre ? `${chapitre.nom} — ${chapitre.univers}` : 'la couverture : la porte d’entrée du magazine'}`);
}

console.log(`\nLA RÈGLE — les sept chapitres se répondent :`);
console.log(`- même palette, même lumière, même saison ;`);
console.log(`- la couverture annonce l’univers de la semaine — **pas de mariés par défaut**,`);
console.log(`  le mariage se suggère par son univers culturel, esthétique, humain ou émotionnel ;`);
console.log(`- chaque chapitre reste immédiatement identifiable ;`);
console.log(`- format 5 / 7 (${'1000 × 1400'}), aucun texte dans l’image, aucun kitsch religieux.`);

console.log(`\nPOUR CHAQUE IMAGE POSÉE — la déclaration, dans \`manifeste-semaines.json\` :\n`);
console.log(JSON.stringify({
  semaine: n,
  chapitre: COUVERTURE,
  univers: 'la couverture',
  titre: s.titre,
  fichier: `images/${cheminSemaine(n)}/${COUVERTURE}.jpg`,
  saison: s.saison,
  style: s.style,
  sujet: '…',
  dominante_color: s.palette[0],
  description: '…',
  mots_cles: ['…', '…', '…'],
  largeur: 1000,
  hauteur: 1400,
}, null, 2));
console.log(`\nEN FIN DE LOT : npm run semaines:verifier && npm run semaines:relever`);
