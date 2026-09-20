/**
 * LES LOTS — LE RYTHME DE PRODUCTION
 *
 * La production va par **lots de 16 journées**. Deux natures de lots :
 *
 * - `fonds` — 16 fonds de couverture. Ils n'attendent aucune fiche : la
 *   couverture sait déjà sa couleur, sa saison et son titre. C'est la
 *   première phase : les 365 fonds d'abord, « ils n'attendent personne ».
 * - `scenes` — 16 journées **documentées** (leur fiche est prête), 5 scènes
 *   chacune : 80 images par lot. L'AUBE est l'image de référence : on la
 *   fait d'abord, puis les quatre autres gardent le même visage, la même
 *   silhouette, le même stylisme — seule la lumière change.
 *
 * On n'illustre pas ce qu'on n'a pas documenté : un lot de scènes ne prend
 * que des journées dont l'état est « prête » dans
 * `docs/casting-des-couvertures.md` (engendré par `npm run prompts`).
 *
 * ```
 * node scripts/lots.mjs etat      le tableau de bord
 * node scripts/lots.mjs fonds [n] le prochain lot de fonds (n, par défaut 16)
 * node scripts/lots.mjs scenes [n] le prochain lot de scènes (n, par défaut 16)
 * ```
 */

import {
  FONDS_ATTENDUS, SCENES_ATTENDUES, MOMENTS_SCENES,
  joursDeLAnnee, etatDisque, lireManifeste, lireCasting, etatFiches,
} from './bibliotheque.mjs';

const ordre = process.argv[2] ?? 'etat';
const n = Math.max(1, Number(process.argv[3] ?? 16));

const disque = etatDisque();
const { fonds, scenes } = lireCasting();
const manifeste = lireManifeste();

const livree = (jour, slot) => disque.parJour.get(jour)?.entrees.get(slot)?.has(1) ?? false;

/* ————————————————————————— LE TABLEAU DE BORD ————————————————————————— */

function tableauDeBord() {
  const fiches = etatFiches();
  const fondsLivrés = joursDeLAnnee().filter((j) => livree(j, 'couverture')).length;
  const scenesLivrées = joursDeLAnnee().reduce((total, j) =>
    total + MOMENTS_SCENES.filter((m) => livree(j, m)).length, 0);
  const avecBrief = new Set(scenes.filter((s) => s.etat === 'prête').map((s) => s.jour)).size;

  const prochainsFonds = joursDeLAnnee().filter((j) => !livree(j, 'couverture')).slice(0, n);
  const prochainesScenes = scenes
    .filter((s) => s.etat === 'prête' && !livree(s.jour, 'aube'))
    .map((s) => s.jour)
    .filter((j, i, tous) => tous.indexOf(j) === i)
    .slice(0, n);

  console.log('ÉTAT DE LA BIBLIOTHÈQUE — AIME MAGAZINE');
  console.log('');
  console.log(`Fiches     ${fiches.documentees} documentées · ${fiches.amorcees} amorcées · ${fiches.fetes} fêtes — sur ${fiches.total}`);
  console.log(`Fonds      ${fondsLivrés} / ${FONDS_ATTENDUS} livrés`);
  console.log(`Scènes     ${scenesLivrées} / ${SCENES_ATTENDUES} livrées · ${avecBrief} journées avec brief`);
  console.log(`Manifeste  ${(manifeste.images ?? []).length} déclaration(s)`);
  console.log('');
  if (prochainsFonds.length > 0) {
    console.log(`Prochain lot fonds   ${prochainsFonds[0]} → ${prochainsFonds[prochainsFonds.length - 1]} (${prochainsFonds.length} à produire) — node scripts/lots.mjs fonds`);
  } else {
    console.log('Prochain lot fonds   — les 365 fonds sont livrés.');
  }
  if (prochainesScenes.length > 0) {
    console.log(`Prochain lot scènes  ${prochainesScenes[0]} → ${prochainesScenes[prochainesScenes.length - 1]} (${prochainesScenes.length} journées documentées) — node scripts/lots.mjs scenes`);
  } else {
    console.log('Prochain lot scènes  — aucune journée documentée en attente : documenter des jours, puis `npm run prompts`.');
  }
}

/* ————————————————————————— LE LOT DE FONDS ————————————————————————— */

function lotFonds() {
  const attendus = joursDeLAnnee().filter((j) => !livree(j, 'couverture')).slice(0, n);
  if (attendus.length === 0) {
    console.log('Les 365 fonds de couverture sont livrés.');
    return;
  }
  console.log(`LOT DE FONDS DE COUVERTURE — ${attendus.length} journée(s)`);
  console.log('');
  console.log('| jour   | couverture            | couleur   | fichier à poser |');
  console.log('| ------ | ------------------- | --------- | --------------- |');
  for (const jour of attendus) {
    const f = fonds.find((x) => x.jour === jour);
    console.log(`| ${jour} | ${f?.titre ?? ''} | ${f?.couleur ?? ''} | images/${jour}/couverture.jpg |`);
  }
  console.log('');
  console.log('LA RÈGLE — un fond ne dépend d\'aucune fiche :');
  console.log('- une **matière du jour** — pas un visage, pas un objet identifiable : un fond qui tient du texte par-dessus ;');
  console.log('- format **5 / 7** portrait (1000 × 1400), grain fin, couleurs désaturées sauf la couleur de la saison ;');
  console.log('- aucun kitsch religieux, pas d\'illustration, pas de rendu 3D lisse, pas de texte dans l\'image ;');
  console.log('- la nuit n\'a pas d\'image : c\'est la queue de la veille, et la couverture garde son dessin.');
  console.log('');
  console.log('POUR CHAQUE IMAGE POSÉE — la déclaration, dans `manifeste.json` :');
  console.log('');
  console.log(JSON.stringify({
    fichier: `images/${attendus[0]}/couverture.jpg`,
    moment: 'couverture',
    lumiere: '…',
    couleur: fonds.find((x) => x.jour === attendus[0])?.couleur ?? '#RRGGBB',
    largeur: 1000,
    hauteur: 1400,
    contient: ['…', 'matière du jour'],
    note: 'premier rang',
  }, null, 2));
  console.log('');
  console.log('EN FIN DE LOT : npm run verifier && npm run relever');
}

/* ————————————————————————— LE LOT DE SCÈNES ————————————————————————— */

function lotScenes() {
  const parJour = new Map();
  for (const s of scenes) {
    if (s.etat !== 'prête') continue;
    if (!parJour.has(s.jour)) parJour.set(s.jour, { personnage: s.personnage, moments: new Map() });
    const info = parJour.get(s.jour);
    for (const m of MOMENTS_SCENES) if (!info.moments.has(m)) info.moments.set(m, livree(s.jour, m));
  }
  const attendus = [];
  for (const [jour, info] of parJour) {
    const manquants = [...info.moments.entries()].filter(([, ok]) => !ok).map(([m]) => m);
    if (manquants.length > 0) attendus.push({ jour, personnage: info.personnage, manquants });
  }
  if (attendus.length === 0) {
    console.log('Aucune journée documentée n\'attend ses scènes. Documenter des jours, puis `npm run prompts`.');
    return;
  }
  const lot = attendus.slice(0, n);
  console.log(`LOT DE SCÈNES — ${lot.length} journée(s) documentée(s), 5 moments chacune`);
  console.log('');
  lot.forEach((j, i) => {
    console.log(`${i + 1}. ${j.jour} — ${j.personnage}`);
    console.log(`   brief : docs/prompts-maitres.md → section « ${j.personnage} » (le prompt maître + les cinq scènes)`);
    console.log('   à poser — l\'aube d\'abord, elle est la référence :');
    for (const m of j.manquants) {
      const marqueur = m === 'aube' ? '← RÉFÉRENCE : la générer en premier, puis les quatre autres sur la même référence' : '';
      console.log(`     ${m}.jpg ${marqueur}`);
    }
    console.log('');
  });
  console.log('LA RÈGLE DE LA MAISON — le même personnage, cinq fois :');
  console.log('- même visage, même silhouette, même garde-robe, les mêmes signes tenus ;');
  console.log('- ce qui change, c\'est la lumière, la posture, le décor, l\'énergie et la narration (le brief dit quoi, moment par moment) ;');
  console.log('- format 5 / 7 portrait (1000 × 1400) ; des candidates ? elles s\'appellent -2, -3 — le premier rang est celui qu\'on veut ;');
  console.log('- une image sans sa déclaration ne sert à rien : chaque fichier posé porte son entrée dans manifeste.json.');
  console.log('');
  console.log('EN FIN DE LOT : npm run verifier && npm run relever');
}

if (ordre === 'etat') tableauDeBord();
else if (ordre === 'fonds') lotFonds();
else if (ordre === 'scenes') lotScenes();
else {
  console.error(`Ordre inconnu : ${ordre} — attendus : etat | fonds [n] | scenes [n]`);
  process.exit(1);
}
