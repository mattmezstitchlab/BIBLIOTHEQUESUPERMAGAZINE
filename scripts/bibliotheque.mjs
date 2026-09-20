/**
 * LA BIBLIOTHÈQUE — LECTURE DU DISQUE, DU MANIFESTE ET DES DOCUMENTS
 *
 * Ce module est la base commune des trois outils (`lots.mjs`,
 * `relever-images.mjs`, `verifier-manifeste.mjs`). Il lit :
 *
 * - le **disque** — `images/MM-JJ/` : c'est la vérité. Ce qui est posé existe.
 * - le **manifeste** — `manifeste.json` : la déclaration de chaque image.
 * - les **documents engendrés** — `docs/casting-des-couvertures.md` (les 365
 *   fonds, les 1 825 scènes, leurs états) et `docs/fiches-de-l-annee.md`
 *   (l'état des 365 fiches). Ils sont écrits par `npm run prompts` et ne
 *   divergent jamais du site — les outils s'en servent, jamais du contraire.
 *
 * Convention de correspondance : le site attend ses images sous
 * `/images/magazine/MM-JJ/` ; ce dépôt les sert sous `images/MM-JJ/`. La même
 * chose, deux adresses — ce module fait la traduction.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');

export const PLANS = ['couverture', 'aube', 'matin', 'midi', 'apres-midi', 'soir'];
export const MOMENTS_SCENES = ['aube', 'matin', 'midi', 'apres-midi', 'soir'];
export const RANGS = [1, 2, 3];
export const FONDS_ATTENDUS = 365;
export const SCENES_ATTENDUES = 1825;

/** Les 365 clés `MM-JJ`, dans l'ordre de l'année. */
export function joursDeLAnnee() {
  const jours = [];
  for (let mois = 1; mois <= 12; mois += 1) {
    const dernier = new Date(2026, mois, 0).getDate();
    for (let quantieme = 1; quantieme <= dernier; quantieme += 1) {
      jours.push(`${String(mois).padStart(2, '0')}-${String(quantieme).padStart(2, '0')}`);
    }
  }
  return jours;
}

/** Vrai quand `MM-JJ` est un jour qui existe dans l'année. */
export function estUnVraiJour(jour) {
  const m = /^(\d{2})-(\d{2})$/.exec(jour);
  if (!m) return false;
  const mois = Number(m[1]);
  const quantieme = Number(m[2]);
  if (mois < 1 || mois > 12) return false;
  const dernier = new Date(2026, mois, 0).getDate();
  return quantieme >= 1 && quantieme <= dernier;
}

/** Un nom de fichier de plan : `slot` ou `slot-2`, `slot-3`. */
export function analyserFichier(nom) {
  const m = /^(couverture|aube|matin|midi|apres-midi|soir)(-(2|3))?\.jpe?g$/i.exec(nom);
  if (!m) return null;
  return { slot: m[1], rang: m[3] ? Number(m[3]) : 1 };
}

/**
 * Le disque : pour chaque jour qui a des fichiers, les plans présents et
 * leurs rangs, et la liste des fichiers réels. Un jour sans fichiers n'a pas
 * d'entrée — c'est le dessin du site qui tient là, et c'est normal.
 */
export function etatDisque() {
  const parJour = new Map();
  for (const jour of joursDeLAnnee()) {
    const dossier = join(RACINE, 'images', jour);
    const entrees = new Map();
    const fichiers = [];
    if (existsSync(dossier)) {
      for (const nom of readdirSync(dossier)) {
        if (nom.startsWith('.')) continue; /* .gitkeep n'est pas une image */
        const chemin = join(dossier, nom);
        if (!statSync(chemin).isFile()) continue;
        fichiers.push(nom);
        const analyse = analyserFichier(nom);
        if (!analyse) continue;
        if (!entrees.has(analyse.slot)) entrees.set(analyse.slot, new Set());
        entrees.get(analyse.slot).add(analyse.rang);
      }
    }
    if (fichiers.length > 0) parJour.set(jour, { entrees, fichiers });
  }
  return { parJour };
}

/** Le manifeste, avec son métadonne et sa liste de déclarations. */
export function lireManifeste() {
  const chemin = join(RACINE, 'manifeste.json');
  if (!existsSync(chemin)) return { meta: {}, images: [] };
  return JSON.parse(readFileSync(chemin, 'utf8'));
}

/**
 * Le document du casting, engendré : les 365 fonds attendus (titre, couleur,
 * fichier) et les 1 825 scènes attendues (personnage, moment, état, fichier).
 */
export function lireCasting() {
  const texte = readFileSync(join(RACINE, 'docs', 'casting-des-couvertures.md'), 'utf8');
  const lignes = texte.split('\n');
  const fonds = [];
  const scenes = [];
  let section = null;
  for (const ligne of lignes) {
    if (/^## 4\./.test(ligne)) section = 'fonds';
    else if (/^## 5\./.test(ligne)) section = 'scenes';
    else if (/^## /.test(ligne)) section = null;
    if (!section) continue;
    const m = section === 'fonds'
      ? /^\| (\d{2}-\d{2}) \| (.+?) \| `([^`]+)` \| `([^`]+)` \|$/.exec(ligne)
      : /^\| (\d{2}-\d{2}) \| (.+?) \| (.+?) \| (.+?) \| `([^`]+)` \|$/.exec(ligne);
    if (!m) continue;
    if (section === 'fonds') {
      fonds.push({ jour: m[1], titre: m[2].trim(), couleur: m[3], fichier: m[4] });
    } else {
      scenes.push({ jour: m[1], personnage: m[2].trim(), moment: m[3].trim(), etat: m[4].trim(), fichier: m[5] });
    }
  }
  return { fonds, scenes };
}

/** L'état des fiches, tel que `docs/fiches-de-l-annee.md` le compte. */
export function etatFiches() {
  const texte = readFileSync(join(RACINE, 'docs', 'fiches-de-l-annee.md'), 'utf8');
  const compte = (marqueur) => texte.split(marqueur).length - 1;
  const sansRien = compte('**Une fête, pas une personne.**') + compte('**À documenter.**');
  return {
    documentees: compte('**Documentée.**'),
    amorcees: compte('**Amorcée.**'),
    /** Les journées sans rien : ce sont des fêtes (un texte, pas une biographie). */
    fetes: sansRien,
    total: 365,
  };
}

/** `/images/magazine/09-21/midi.jpg` → `images/09-21/midi.jpg`. */
export function cheminLocal(fichierDuDocument) {
  return fichierDuDocument.replace(/^\/images\/magazine\//, 'images/');
}

/** Le nom de la section du brief dans `docs/prompts-maitres.md`, pour un personnage. */
export function titreDeLaScene(scene) {
  return scene.personnage;
}
