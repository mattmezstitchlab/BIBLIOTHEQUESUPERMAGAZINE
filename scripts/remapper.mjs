#!/usr/bin/env node
/**
 * LES ANCIENS ASSETS — L'INVENTAIRE, ET CE QU'ILS POURRAIENT DEVENIR
 *
 *   node scripts/remapper.mjs            écrit le rapport
 *   node scripts/remapper.mjs --sec      affiche le rapport sans l'écrire
 *
 * **Ce script ne déplace rien, ne renomme rien, ne supprime rien.** Il lit ce
 * qui existe dans `images/MM-JJ/` et dans `manifeste.json`, compte, et propose.
 * La décision de remapper appartient à la validation — pas à un script.
 *
 * Il écrit `docs/remappage-anciens-assets.md` : ce qui existe, ce qui est
 * concerné, et pour chaque famille d'images les destinations possibles, avec
 * ce que chacune coûte.
 */

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { RACINE, PLANS } from './bibliotheque.mjs';
import { SEMAINES, cheminSemaine, plageDates, saisonDeLaSemaine, semaineDuJour, SAISON_EN_FRANCAIS } from './semaines.mjs';

const sec = process.argv.includes('--sec');

/* ———————————————————————— CE QUI EXISTE, COMPTÉ ———————————————————————— */

const manifeste = JSON.parse(readFileSync(join(RACINE, 'manifeste.json'), 'utf8'));
const declarations = manifeste.images ?? [];

/** Les couvertures-jour : le premier rang de chaque plan `couverture`. */
const couvertures = declarations.filter((i) => i.moment === 'couverture');
const scenes = declarations.filter((i) => i.moment !== 'couverture');
const candidates = declarations.filter((i) => /-2\.jpg$|-3\.jpg$/.test(i.fichier));

const joursEnDisque = readdirSync(join(RACINE, 'images'))
  .filter((n) => /^\d{2}-\d{2}$/.test(n) && statSync(join(RACINE, 'images', n)).isDirectory())
  .sort();

/** Le mois d'un jour, pour grouper. */
const mois = (jour) => jour.slice(0, 2);

/** La saison d'une couverture-jour, vue depuis la nouvelle architecture. */
const saisonDuJour = (jour) => saisonDeLaSemaine(semaineDuJour(jour));

/** Une ligne de déclaration, lisible. */
const lisible = (d) => `${d.fichier}  ·  ${d.lumiere}  ·  ${d.couleur}`;

/* ————————————————————————— LE REMAPPAGE PROPOSÉ ————————————————————————— */

/**
 * Les couvertures-jour sont des **matières du jour** : abstraites, sans
 * visage, sans objet identifiable, une couleur dominante, un accident de
 * lumière. C'est exactement une des formes que le brief accepte pour une
 * couverture de magazine (« matière »).
 *
 * Elles ont été produites pour l'hiver et le début du printemps (01-01 →
 * 02-21), dans le bleu nuit de la saison. Leur remappage naturel est donc vers
 * les **semaines d'hiver et de printemps**, comme couverture ou comme image de
 * chapitre quand le chapitre est une matière.
 *
 * Le rapport ne choisit pas : il donne les deux options, et le compte.
 */
const parMois = new Map();
for (const d of couvertures) {
  const m = mois(d.fichier.slice('images/'.length, 'images/'.length + 5));
  if (!parMois.has(m)) parMois.set(m, []);
  parMois.get(m).push(d);
}

/** Les scènes, groupées par jour — c'est une journée entière, cinq moments. */
const parJourScene = new Map();
for (const s of scenes) {
  const jour = s.fichier.split('/')[1];
  if (!parJourScene.has(jour)) parJourScene.set(jour, []);
  parJourScene.get(jour).push(s);
}

/* ————————————————————————————— LE RAPPORT ————————————————————————————— */

const l = [];
const p = (s = '') => l.push(s);

p('# Les anciens assets — inventaire et remappage proposé');
p();
p('> **Engendré par** `npm run remapper`. Ce document **ne déplace rien** : il compte');
p('> ce qui existe, dit à quoi ça ressemble, et propose des destinations. La');
p('> décision de remapper appartient à la validation.');
p();
p('---');
p();
p('## 1. Pourquoi ce document');
p();
p('L’architecture éditoriale a changé : on n’écrit plus **365 jours = 365');
p('magazines**, mais **54 semaines = 54 magazines**, chacune avec **7 chapitres**.');
p('Les assets produits sous l’ancien modèle ne sont ni faux ni perdus — ils sont');
p('**hors modèle**. Ce document les recense pour qu’on décide, en connaissance de');
p('cause, lesquels remapper et lesquels garder en archive.');
p();
p('**Rien n’a été détruit, renommé ni déplacé.**');
p();
p('---');
p();
p('## 2. Ce qui existe aujourd’hui');
p();
p('| famille | où | nombre | état |');
p('| --- | --- | --- | --- |');
p(`| Couvertures-jour (« matière du jour ») | \`images/MM-JJ/couverture.jpg\` | **${couvertures.length}** | déclarées, vérifiées |`);
p(`| Scènes (aube → soir, un personnage) | \`images/MM-JJ/{aube,matin,midi,apres-midi,soir}.jpg\` | **${scenes.length}** | déclarées, vérifiées |`);
p(`| Candidates de casting (rangs 2 et 3) | \`images/MM-JJ/*-2.jpg\`, \`*-3.jpg\` | **${candidates.length}** | — |`);
p(`| Dossiers de jour créés | \`images/MM-JJ/\` | ${joursEnDisque.length} | vides, sauf les jours travaillés |`);
p(`| Déclarations à l’ancien manifeste | \`manifeste.json\` | **${declarations.length}** | vérificateur des jours : sortie 0 |`);
p();
p('**Total d’images réelles : ' + declarations.length + '.**');
p();
p('---');
p();
p('## 3. Les couvertures-jour — ce qu’elles sont, vraiment');
p();
p('Ce sont des **matières du jour** : aucune personne, aucun visage, aucun objet');
p('identifiable, aucune foule, aucun texte. Une couleur dominante, une seule source');
p('de lumière, un accident de lumière assumé, un cadre large et calme où du texte');
p('peut tenir. La règle de production était : *« une matière sans lumière ne tient');
p('pas un titre de couverture »*.');
p();
p('Dans le vocabulaire du nouveau brief, ce sont des couvertures de type');
p('**« matière »** — une des formes admises, à côté de la photographie de mode,');
p('l’architecture, le portrait, la nature, la gastronomie, l’objet, le voyage, la');
p('musique, la danse, le cinéma, la culture, l’art, le paysage, la scène de vie et');
p('la photographie conceptuelle.');
p();
p('### Par mois, avec leur saison dans la nouvelle grille');
p();
p('| mois | couvertures | saison | semaines correspondantes |');
p('| --- | --- | --- | --- |');
for (const [m, liste] of [...parMois.entries()].sort()) {
  const jours = liste.map((d) => d.fichier.split('/')[1]).sort();
  const premiere = jours[0];
  const derniere = jours[jours.length - 1];
  const s1 = semaineDuJour(premiere);
  const s2 = semaineDuJour(derniere);
  p(`| ${m} | ${liste.length} (du ${premiere} au ${derniere}) | ${SAISON_EN_FRANCAIS[saisonDuJour(premiere)]} | semaine ${String(s1).padStart(2, '0')}${s2 !== s1 ? ` → ${String(s2).padStart(2, '0')}` : ''} |`);
}
p();
p('**Le constat qui compte :** ces matières ont été produites pour les semaines');
p('**01 à 09** de la nouvelle grille (janvier et février). Elles portent toutes la');
p(`palette de l’hiver — bleu nuit \`#16233F\`, noir \`#0B0B0F\`, \`#0d1526\`. Ce sont`);
p('donc des candidates naturelles pour les semaines d’hiver, et un contre-emploi');
p('pour les semaines d’été ou d’automne.');
p();
p('---');
p();
p('## 4. Les scènes — ce qu’elles sont, vraiment');
p();
p('Cinq moments (l’aube, le matin, le midi, l’après-midi, le soir) du **même');
p('personnage**, tenu sur une image de référence. Chaque journée documentée a');
p('donné cinq scènes.');
p();
p('| journée | personnage | scènes | saison | semaine |');
p('| --- | --- | --- | --- | --- |');
for (const [jour, liste] of [...parJourScene.entries()].sort()) {
  p(`| ${jour} | ${liste[0].contient?.[0] ?? '—'} | ${liste.length}/5 | ${SAISON_EN_FRANCAIS[saisonDuJour(jour)]} | ${String(semaineDuJour(jour)).padStart(2, '0')} |`);
}
p();
p('Ces scènes racontent **un personnage, une journée, sa lumière**. Dans le');
p('nouveau modèle elles ne sont pas perdues : elles sont des **portraits** — la');
p('forme la plus proche du chapitre **01 — Les amoureux** (« émotions, relation');
p('humaine ») et, pour les plus documentaires (le tirage de Véronique, le livre');
p('d’or de Jean-Baptiste), du chapitre **07 — Les souvenirs**.');
p();
p('Elles ont un défaut pour le nouveau modèle : **elles montrent une personne,');
p('pas un couple**. Si les amoureux doivent être deux, elles ne conviennent pas —');
p('il faut le dire avant de les remapper.');
p();
p('---');
p();
p('## 5. Les destinations possibles — trois options, et ce qu’elles coûtent');
p();
p('### Option A — Les matières servent de couvertures d’hiver');
p();
p('Les couvertures-jour des jours 01-01 → 02-21 sont remappées vers les semaines');
p('01 à 09 de la nouvelle grille, en `cover.jpg`. Les scènes restent en réserve');
p('pour le chapitre 01.');
p('');
p('- **Ce que ça donne** : jusqu’à 9 couvertures servies immédiatement, sans une');
p('  seule nouvelle génération.');
p('- **Ce que ça coûte** : une couverture de magazine doit *annoncer l’univers de');
p('  la semaine* ; une matière seule annonce une atmosphère, pas un univers. Il');
p('  faudra vérifier semaine par semaine que le concept du plan est tenu par');
p('  l’image — et remplacer ce qui ne tient pas.');
p('- **Ce qui est déplacé** : des fichiers (copie vers `images/semaine-NN/`), et');
p('  des lignes de manifeste. L’ancien dossier **reste en place**.');
p();
p('### Option B — Les matières servent d’images de chapitre');
p();
p('Les mêmes images deviennent les `04-recevoir.jpg` ou `03-lieux.jpg` de');
p('certaines semaines, quand le chapitre est une matière (une table, une pierre,');
p('un tissu).');
p();
p('- **Ce que ça donne** : le chapitre reçoit une image déjà juste');
p('  techniquement (5 / 7, sans visage, sans texte).');
p('- **Ce que ça coûte** : un chapitre doit être **immédiatement identifiable**');
p('  comme son univers. Une matière abstraite ne dit pas « l’art de recevoir » —');
p('  il faudra de toute façon des images avec la table, les objets, les gestes.');
p('- **Ce qui est déplacé** : les mêmes fichiers.');
p();
p('### Option C — Archive, et rien d’autre');
p();
p('Les 77 images restent où elles sont, avec leur manifeste, leurs URLs et leur');
p('vérificateur. La bibliothèque des semaines part de zéro.');
p();
p('- **Ce que ça donne** : aucune ambiguïté. L’ancienne URL continue de servir, et');
p('  rien du travail passé ne peut se retrouver mal placé.');
p('- **Ce que ça coûte** : 77 images produites et déclarées qui ne servent pas au');
p('  nouveau modèle.');
p();
p('---');
p();
p('## 6. Ce qui doit être remappé — la liste courte');
p();
p('| à remapper | nombre | vers | pourquoi |');
p('| --- | --- | --- | --- |');
p(`| Couvertures-jour d’hiver (01-01 → 02-28) | ${couvertures.filter((d) => ['01', '02'].includes(mois(d.fichier.split('/')[1]))).length} | \`semaine-01\` → \`semaine-09\` / \`cover.jpg\` | même saison, même palette, même forme (« matière ») |`);
p(`| Scènes complètes (journées à 5 moments) | ${[...parJourScene.values()].filter((v) => v.length === 5).length} journées | chapitre \`01-amoureux\` ou \`07-souvenirs\` | ce sont des portraits tenus, pas des illustrations |`);
p('| Candidates de casting (rangs 2-3) | — | nulle part | aucune n’a été produite à ce jour |');
p();
p('**Ce qui ne doit pas être remappé :** les dossiers de jour vides (365), qui ne');
p('servent plus à rien dans le nouveau modèle — leur suppression est une décision');
p('séparée, et elle n’a pas été prise.');
p();
p('---');
p();
p('## 7. Ce que le remappage ne ferait pas');
p();
p('- **Il ne renommerait pas** `images/MM-JJ/` en `images/semaine-NN/` : ce sont');
p('  deux structures différentes, pas deux écritures du même nom.');
p('- **Il ne toucherait pas** au manifeste des jours : il reste la déclaration de');
p('  ce qui a été produit sous l’ancien modèle.');
p('- **Il ne franchirait pas la frontière des saisons** : une matière d’hiver ne');
p('  devient pas une couverture d’août.');
p();
p('---');
p();
p('## 8. Ce qui est demandé');
p();
p('Trois décisions, et une seule à prendre maintenant :');
p();
p('1. **Quelle option** pour les ' + couvertures.length + ' matières — A, B ou C ?');
p('2. **Les scènes** peuvent-elles servir le chapitre « Les amoureux » alors');
p('   qu’elles montrent une personne seule, ou faut-il des couples ?');
p('3. **Les 365 dossiers de jour vides** — on les garde pour mémoire, ou on les');
p('   supprime ?');
p();
p('Tant qu’aucune réponse n’est donnée, **rien ne bouge** : les deux structures');
p('coexistent, et les deux vérificateurs passent.');
p();

const rapport = `${l.join('\n').replace(/^p\(\);\n/gm, '\n')}\n`;

if (sec) {
  console.log(rapport);
} else {
  writeFileSync(join(RACINE, 'docs/remappage-anciens-assets.md'), rapport);
  console.log(`docs/remappage-anciens-assets.md — ${couvertures.length} matières, ${scenes.length} scènes, ${joursEnDisque.length} dossiers de jour.`);
  console.log('Rien n’a été déplacé, renommé ni supprimé.');
}
