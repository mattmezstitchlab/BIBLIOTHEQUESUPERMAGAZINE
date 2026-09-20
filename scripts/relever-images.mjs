/**
 * RELEVER LES IMAGES
 *
 * `npm run relever` regarde ce qui est **réellement arrivé** dans `images/`
 * et le compte :
 *
 * - les **fonds de couverture** livrés (le premier rang est posé) sur les 365 ;
 * - les **scènes** livrées sur les 1 825 (cinq moments × 365 jours) ;
 * - les **candidates** posées en rang 2 et 3 ;
 * - la **cohérence** avec le manifeste (déclaré, posé, les deux, ni l'un ni
 *   l'autre) ;
 * - les **prochaines scènes** : les journées documentées qui n'ont pas encore
 *   leurs cinq moments, dans l'ordre de l'année.
 *
 * L'outil n'écrit rien : le disque est la vérité, le manifeste est la
 * promesse, et c'est `verifier-manifeste.mjs` qui arbitre les deux.
 */

import {
  FONDS_ATTENDUS, SCENES_ATTENDUES, MOMENTS_SCENES,
  joursDeLAnnee, etatDisque, lireManifeste, lireCasting,
} from './bibliotheque.mjs';

const disque = etatDisque();
const manifeste = lireManifeste();
const { scenes } = lireCasting();

/* ————————————————————————— LE COMPTE ————————————————————————— */

let fonds = 0;
let sceneLivrees = 0;
let candidates = 0;
const joursComplets = [];

for (const jour of joursDeLAnnee()) {
  const entrees = disque.parJour.get(jour)?.entrees ?? new Map();
  if (entrees.get('couverture')?.has(1)) fonds += 1;
  const momentsLivrés = MOMENTS_SCENES.filter((m) => entrees.get(m)?.has(1)).length;
  sceneLivrees += momentsLivrés;
  if (momentsLivrés === MOMENTS_SCENES.length) joursComplets.push(jour);
  for (const rangs of entrees.values()) for (const r of rangs) if (r >= 2) candidates += 1;
}

/* ————————————————————————— COHÉRENCE AVEC LE MANIFESTE ————————————————————————— */

const declares = new Set((manifeste.images ?? []).map((i) => i.fichier));
const diskPosé = (chemin) => {
  const [jour, nom] = chemin.split('/');
  return disque.parJour.get(jour)?.fichiers.includes(nom) ?? false;
};
let poseEtDeclaree = 0;
let poseeSeule = 0;
for (const [jour, { fichiers }] of disque.parJour) {
  for (const nom of fichiers) {
    const chemin = `images/${jour}/${nom}`;
    if (declares.has(chemin)) poseEtDeclaree += 1;
    else poseeSeule += 1;
  }
}
const declareeSeule = [...declares].filter((d) => d.startsWith('images/') && !diskPosé(d)).length;

/* ————————————————————————— LES PROCHAINES SCÈNES ————————————————————————— */

const documentees = new Map();
for (const s of scenes) {
  if (s.etat !== 'prête') continue;
  if (!documentees.has(s.jour)) documentees.set(s.jour, { personnage: s.personnage, manquant: new Set(MOMENTS_SCENES) });
}
const prochaines = [];
for (const [jour, info] of documentees) {
  const entrees = disque.parJour.get(jour)?.entrees ?? new Map();
  for (const m of MOMENTS_SCENES) if (entrees.get(m)?.has(1)) info.manquant.delete(m);
  if (info.manquant.size > 0) prochaines.push({ jour, personnage: info.personnage, manquant: [...info.manquant] });
}

/* ————————————————————————— LE TABLEAU ————————————————————————— */

console.log('LA BIBLIOTHÈQUE — LE RELEVÉ');
console.log('');
console.log(`Fonds de couverture    ${String(fonds).padStart(3)} / ${FONDS_ATTENDUS}`);
console.log(`Scènes                 ${String(sceneLivrees).padStart(4)} / ${SCENES_ATTENDUES}`);
console.log(`Journées complètes     ${joursComplets.length} (les cinq moments posés)${joursComplets.length > 0 ? ` — ${joursComplets.join(', ')}` : ''}`);
console.log(`Candidates en rangs 2-3 ${candidates}`);
console.log('');
console.log('Manifeste —');
console.log(`  images posées et déclarées : ${poseEtDeclaree}`);
console.log(`  posées sans déclaration    : ${poseeSeule}  ← avertissement du vérificateur`);
console.log(`  déclarées sans image       : ${declareeSeule}  ← erreur du vérificateur`);
console.log('');
console.log(`Prochaines scènes (journées documentées, ordre de l'année) : ${prochaines.length} jour(s) en attente`);
for (const p of prochaines.slice(0, 24)) {
  console.log(`  ${p.jour} — ${p.personnage} : ${p.manquant.join(', ')}`);
}
if (prochaines.length === 0) console.log('  — aucune : les 80 scènes briefées sont livrées, ou il n\'y a pas encore de scène posée.');
