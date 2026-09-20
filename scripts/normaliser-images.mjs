#!/usr/bin/env node
/**
 * NORMALISER LES IMAGES — LE CADRAGE, LE SEUL CHAMP QUI NE SE NÉGOCIE PAS
 *
 * Deux modèles, deux formats, et **le chemin dit lequel** :
 *
 *   images/MM-JJ/<plan>.jpg          →  5 / 7      1000 × 1400  (la bibliothèque des jours)
 *   images/semaine-NN/<chapitre>.jpg →  A4 portrait 1240 × 1754  (les 54 magazines)
 *
 * Un outil de génération rend ce qu'il veut — 1024 × 1536, 864 × 1216, un
 * carré. La déclaration exige des dimensions justes. Ce script met le fichier
 * au format de son modèle, et ne touche à rien d'autre.
 *
 *   node scripts/normaliser-images.mjs            tout `images/`
 *   node scripts/normaliser-images.mjs 01-01       un seul jour
 *   node scripts/normaliser-images.mjs semaine-07  une seule semaine
 *   node scripts/normaliser-images.mjs --sec       n'écrit rien, montre
 *
 * La méthode, dans l'ordre :
 *   1. recadrer au centre au plus près du ratio (on perd quelques pixels de
 *      bord, jamais de matière au centre) ;
 *   2. redimensionner à la taille du modèle ;
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

import { RACINE, PLANS } from './bibliotheque.mjs';
import { FORMAT, IMAGES_DE_LA_SEMAINE, NOMBRE_DE_SEMAINES } from './semaines.mjs';

const QUALITE = 88;

/** Les deux modèles, chacun son format. */
const MODELES = [
  { nom: 'les jours (5 / 7)', dossier: /^\d{2}-\d{2}$/, largeur: 1000, hauteur: 1400, slots: PLANS },
  { nom: `les semaines (${FORMAT.nom})`, dossier: /^semaine-\d{2}$/, largeur: FORMAT.largeur, hauteur: FORMAT.hauteur, slots: IMAGES_DE_LA_SEMAINE },
];

const args = process.argv.slice(2);
const sec = args.includes('--sec');
const cible = args.find((a) => /^\d{2}-\d{2}$/.test(a) || /^semaine-\d{2}$/.test(a)) ?? null;

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
  console.error('Rien n’a été touché : les fichiers ne sont pas au format de leur modèle.');
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
 * Les dimensions du recadrage : le plus grand rectangle au ratio du modèle qui
 * tient dans l'image, centré. On rogne sur l'axe qui dépasse — jamais les deux,
 * et jamais d'étirement.
 */
function recadrage(l, h, modele) {
  const ratio = modele.largeur / modele.hauteur;
  const largeur = Math.min(l, Math.round(h * ratio));
  const hauteur = Math.min(h, Math.round(l / ratio));
  return { largeur, hauteur };
}

const refaire = (fichier, modele) => {
  const dim = dimensions(fichier);
  if (!dim) return { etat: 'illisible' };
  if (dim.l === modele.largeur && dim.h === modele.hauteur) return { etat: 'bon', dim };

  const { largeur, hauteur } = recadrage(dim.l, dim.h, modele);
  if (!sec) {
    execFileSync(outil, [
      fichier,
      '-strip',
      '-gravity', 'center',
      '-crop', `${largeur}x${hauteur}+0+0`,
      '+repage',
      '-resize', `${modele.largeur}x${modele.hauteur}!`,
      '-quality', String(QUALITE),
      fichier,
    ]);
  }
  return { etat: sec ? 'à refaire' : 'refait', dim, modele };
};

/* ————————————————— LE PARCOURS DES DEUX MODÈLES ————————————————— */

const dossiers = readdirSync(join(RACINE, 'images')).sort();
const faits = [];
const bons = [];
const rates = [];
let total = 0;

for (const dossier of dossiers) {
  if (cible && dossier !== cible) continue;
  const modele = MODELES.find((m) => m.dossier.test(dossier));
  if (!modele) continue;
  const cheminDossier = join(RACINE, 'images', dossier);
  if (!statSync(cheminDossier).isDirectory()) continue;

  for (const entree of readdirSync(cheminDossier)) {
    if (entree.startsWith('.') || !/^[a-z0-9-]+\.jpg$/.test(entree)) continue;
    const slot = entree.replace(/\.jpg$/, '').replace(/-[23]$/, '');
    if (!modele.slots.includes(slot)) continue;
    const fichier = join(cheminDossier, entree);
    total += 1;
    const r = refaire(fichier, modele);
    const chemin = `images/${dossier}/${entree}`;
    if (r.etat === 'bon') bons.push(chemin);
    else if (r.etat === 'illisible') rates.push(chemin);
    else faits.push({ chemin, ...r });
  }
}

if (!total) {
  console.log(cible ? `Aucune image pour ${cible}.` : 'Aucune image dans `images/` : il n’y a rien à normaliser.');
  process.exit(0);
}

if (faits.length) {
  console.log(`${sec ? 'À REFAIRE' : 'REFAIT'} — ${faits.length} fichier(s)`);
  for (const f of faits) {
    console.log(`  ${f.chemin} : ${f.dim.l}×${f.dim.h} → ${f.modele.largeur}×${f.modele.hauteur} (${f.modele.nom})`);
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
  console.log('Appeler le vérificateur du modèle : le cadrage déclaré doit maintenant tenir.');
}
process.exit(rates.length ? 1 : 0);
