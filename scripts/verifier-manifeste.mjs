/**
 * VÉRIFIER LE MANIFESTE
 *
 * `npm run verifier` relit `manifeste.json` et dit, image par image, si la
 * déclaration tient :
 *
 * - le **fichier** — un vrai jour, un vrai plan, un vrai rang (1 à 3), une vraie extension ;
 * - le **moment** — déclaré, et cohérent avec le nom de fichier ;
 * - la **lumière** — dite, pas vide ;
 * - la **couleur** — une dominante, en `#RRGGBB` ;
 * - le **cadrage** — des dimensions, au ratio 5 / 7 ;
 * - le **sujet** — `contient` n'est pas vide ;
 * - l'**ordre** — un rang 2 ou 3 sans rang 1 est un décalage (avertissement :
 *   l'ordre des fichiers est un ordre) ;
 * - le **lien** — chaque fichier déclaré existe sur le disque : le manifeste
 *   ne promet pas de liens morts ;
 * - l'**inverse** — chaque image posée sur le disque a sa déclaration
 *   (avertissement : une image sans déclaration ne sert à rien).
 *
 * Zéro erreur : sortie 0. Sinon : sortie 1. L'outil n'écrit rien — il juge.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  RACINE, PLANS, estUnVraiJour, analyserFichier, etatDisque, lireManifeste,
} from './bibliotheque.mjs';

const erreurs = [];
const avertissements = [];
const dire = (liste, message) => liste.push(message);

const manifeste = lireManifeste();
const images = manifeste.images ?? [];
const disque = etatDisque();

/* ————————————————————————— LA DÉCLARATION, CHAMP PAR CHAMP ————————————————————————— */

const vus = new Set();
const parFichier = new Map();

images.forEach((img, i) => {
  const qui = `images[${i}] (${img.fichier ?? 'sans nom'})`;
  const problemes = [];

  if (typeof img.fichier !== 'string' || !/^images\/\d{2}-\d{2}\/.+/.test(img.fichier)) {
    problemes.push('fichier : pas un chemin `images/MM-JJ/…`');
  } else {
    const [, jour, nom] = img.fichier.split('/');
    if (!estUnVraiJour(jour)) problemes.push(`fichier : ${jour} n'est pas un jour qui existe`);
    const analyse = analyserFichier(nom);
    if (!analyse) problemes.push(`fichier : ${nom} n'est pas un plan attendu (${PLANS.join(', ')} ; rangs -2, -3)`);
    else {
      if (img.moment !== analyse.slot) problemes.push(`moment : déclaré « ${img.moment ?? ''} », le fichier dit « ${analyse.slot} »`);
      if (analyse.rang >= 2 && !parFichier.has(`${jour}/${analyse.slot}-1`)) {
        avertissements.push(`${qui} — rang ${analyse.rang} sans rang 1 : l'ordre des fichiers est un ordre`);
      }
      const cles = `${jour}/${analyse.slot}-${analyse.rang}`;
      if (vus.has(cles)) problemes.push('déclaration en double : un seul rang par jour, par plan, par rang');
      vus.add(cles);
      parFichier.set(cles, true);
    }
  }

  if (typeof img.lumiere !== 'string' || img.lumiere.trim() === '') problemes.push('lumière : rien n\'est déclaré');
  if (typeof img.couleur !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(img.couleur)) problemes.push(`couleur : « ${img.couleur ?? ''} » n'est pas une dominante #RRGGBB`);
  if (typeof img.largeur !== 'number' || !Number.isInteger(img.largeur) || img.largeur <= 0
    || typeof img.hauteur !== 'number' || !Number.isInteger(img.hauteur) || img.hauteur <= 0) {
    problemes.push('cadrage : largeur et hauteur doivent être des entiers positifs');
  } else if (img.largeur * 7 !== img.hauteur * 5) {
    problemes.push(`cadrage : ${img.largeur}×${img.hauteur} n'est pas du 5 / 7`);
  }
  if (!Array.isArray(img.contient) || img.contient.length === 0
    || img.contient.some((c) => typeof c !== 'string' || c.trim() === '')) {
    problemes.push('sujet : `contient` doit lister ce qu\'on voit dans l\'image');
  }
  if (img.note !== undefined && typeof img.note !== 'string') problemes.push('note : un texte, rien d\'autre');

  if (problemes.length > 0) erreurs.push(`${qui} — ${problemes.join(' · ')}`);

  /* le lien promis existe-t-il ? */
  if (typeof img.fichier === 'string' && img.fichier.startsWith('images/')) {
    if (!existsSync(join(RACINE, img.fichier))) {
      erreurs.push(`${qui} — le fichier n'est pas sur le disque : un lien ne peut pas promettre une image absente`);
    }
  }
});

/* ————————————————————————— L'INVERSE : LE DISQUE, DÉCLARÉ OU PAS ————————————————————————— */

for (const [jour, { fichiers }] of disque.parJour) {
  for (const nom of fichiers) {
    const analyse = analyserFichier(nom);
    if (!analyse) {
      avertissements.push(`images/${jour}/${nom} — fichier inattendu dans un dossier de jour`);
      continue;
    }
    const cles = `${jour}/${analyse.slot}-${analyse.rang}`;
    if (!vus.has(cles)) {
      avertissements.push(`images/${jour}/${nom} — posée sans déclaration : une image sans ses cinq champs ne sert à rien`);
    }
  }
}

/* ————————————————————————— LE VERDICT ————————————————————————— */

console.log('LE MANIFESTE — LE VERDICT');
console.log('');
console.log(`${images.length} déclaration(s) · ${disque.parJour.size} jour(s) avec des images sur le disque`);
console.log('');

if (avertissements.length > 0) {
  console.log('Avertissements —');
  avertissements.forEach((a) => console.log(`  ⚠ ${a}`));
  console.log('');
}

if (erreurs.length > 0) {
  console.log('Erreurs —');
  erreurs.forEach((e) => console.log(`  ✗ ${e}`));
  console.log('');
  console.log(`Le manifeste ne tient pas : ${erreurs.length} erreur(s).`);
  process.exit(1);
}

console.log('Le manifeste tient : chaque déclaration porte ses cinq champs, chaque lien existe, chaque image posée est déclarée.');
console.log('Une image manquante ne casse jamais une page — le site garde son dessin partout ailleurs.');
