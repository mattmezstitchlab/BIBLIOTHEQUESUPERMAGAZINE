#!/usr/bin/env node
/**
 * LE PLAN DES 54 SEMAINES — LE DOCUMENT ENGENDRÉ, JAMAIS ÉCRIT À LA MAIN
 *
 *   node scripts/plan-semaines.mjs
 *
 * Écrit `docs/plan-des-54-semaines.md` depuis `scripts/semaines.mjs` : le
 * tableau des 54 magazines (dates, saison, titre, style, palette), puis, pour
 * chaque semaine, son idée de couverture, le fil qui tient ses sept chapitres,
 * et **les huit fichiers attendus**.
 *
 * Le plan ne se recopie pas : il se régénère. Si une semaine change, elle
 * change dans `semaines.mjs`, et le document suit.
 */

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { RACINE } from './bibliotheque.mjs';
import {
  CHAPITRES,
  IMAGES_DE_LA_SEMAINE,
  SAISON_EN_FRANCAIS,
  SEMAINES,
  cheminSemaine,
  plageDates,
  saisonDeLaSemaine,
  semaineDuJour,
} from './semaines.mjs';

const famille = (style) => style.split(',')[0].trim();

const lignes = [];
const p = (s = '') => lignes.push(s);

p('# Le plan des 54 semaines — 54 magazines, 7 chapitres');
p();
p('> **Engendré par** `npm run plan`. Ce document ne s’écrit pas à la main : il');
p('> vient de `scripts/semaines.mjs`. Une semaine change là-bas, le plan suit.');
p();
p('**54 magazines** (un par semaine) · **7 chapitres** par magazine · **8 images** par');
p('semaine · **432 images** en tout. Chaque semaine porte les sept mêmes univers,');
p('traités autrement : c’est la diversité des traitements, pas celle des sujets,');
p('qui fait la collection.');
p();
p('**Le mariage est le territoire commun.** Il peut apparaître directement ou');
p('indirectement — une robe, une table, une ville, une chanson, une famille, un');
p('voyage, un objet transmis, une architecture. La règle absolue : ne pas produire');
p('« des images de mariage », mais une bibliothèque éditoriale sur son univers.');
p();
p('---');
p();
p('## 1. Le découpage de l’année');
p();
p('365 jours ne se divisent pas en 54 semaines de 7 jours (54 × 7 = 378). Le');
p('découpage est **proportionnel et régulier** : la semaine `n` couvre les jours');
p('`⌊(n−1) × 365 / 54⌋ + 1` à `⌊n × 365 / 54⌋` de l’année. Chaque jour appartient à');
p('exactement une semaine, aucune semaine n’est vide, et la règle se recalcule sans');
p('table. **Le site reste maître du calendrier** : cette règle est écrite pour que');
p('la bibliothèque sache à quelle saison appartient une semaine.');
p();
p('La saison d’une semaine est **celle de la majorité de ses jours** — aux dates');
p('astronomiques : printemps le 20 mars, été le 21 juin, automne le 23 septembre,');
p('hiver le 21 décembre.');
p();
p('| semaine | jours de l’année | dates | saison |');
p('| --- | --- | --- | --- |');
for (const s of SEMAINES) {
  const d = plageDates(s.n);
  p(`| ${String(s.n).padStart(2, '0')} | ${d.debut} → ${d.fin} | ${d.debut} au ${d.fin} | ${SAISON_EN_FRANCAIS[saisonDeLaSemaine(s.n)]} |`);
}
p();
p('---');
p();
p('## 2. Les 54 magazines');
p();
p('| semaine | dates | saison | titre | style dominant | palette |');
p('| --- | --- | --- | --- | --- | --- |');
for (const s of SEMAINES) {
  const d = plageDates(s.n);
  p(`| ${String(s.n).padStart(2, '0')} | ${d.debut} → ${d.fin} | ${SAISON_EN_FRANCAIS[saisonDeLaSemaine(s.n)]} | **${s.titre}** | ${s.style} | \`${s.palette[0]}\` \`${s.palette[1]}\` |`);
}
p();
p('---');
p();
p('## 3. Les sept chapitres — les mêmes, chaque semaine');
p();
p('| ordre | chapitre | fichier | univers |');
p('| --- | --- | --- | --- |');
for (const c of CHAPITRES) {
  p(`| ${String(c.ordre).padStart(2, '0')} | ${c.nom} | \`${c.slug}.jpg\` | ${c.univers} |`);
}
p();
p('Les sept images d’une semaine ne sont pas sept images indépendantes : elles');
p('fonctionnent ensemble comme les chapitres d’un même magazine — palette,');
p('lumière, saison, texture, territoire ou ambiance partagés. Chaque chapitre');
p('reste immédiatement identifiable.');
p();
p('---');
p();
p('## 4. Les sept univers, semaine par semaine');
p();

for (const s of SEMAINES) {
  const d = plageDates(s.n);
  const saison = saisonDeLaSemaine(s.n);
  p(`### Semaine ${String(s.n).padStart(2, '0')} — ${s.titre}`);
  p();
  p(`**${d.debut} au ${d.fin}** · ${SAISON_EN_FRANCAIS[saison]} · ${s.style} · palette \`${s.palette[0]}\` \`${s.palette[1]}\``);
  p();
  p(`**La couverture** — ${s.couverture}`);
  p();
  p(`**Le fil** — ${s.fil}`);
  p();
  p('```text');
  p(`${cheminSemaine(s.n)}/`);
  for (const slug of IMAGES_DE_LA_SEMAINE) {
    const chapitre = CHAPITRES.find((c) => c.slug === slug);
    const quoi = chapitre ? chapitre.nom : 'la couverture — la porte d’entrée';
    p(`  ${slug}.jpg`.padEnd(28) + (chapitre ? `← ${quoi} : ${chapitre.univers}` : `← ${quoi}`));
  }
  p('```');
  p();
}

p('---');
p();
p('## 5. La correspondance DATE → SEMAINE → CHAPITRE');
p();
p('Un exemple pris sur les journées déjà documentées par le magazine :');
p();
p('| date | semaine | magazine |');
p('| --- | --- | --- |');
for (const jour of ['02-14', '03-17', '05-16', '06-24', '07-12', '12-25']) {
  const n = semaineDuJour(jour);
  const s = SEMAINES.find((x) => x.n === n);
  p(`| ${jour} | semaine ${String(n).padStart(2, '0')} | ${s.titre} |`);
}
p();
p('Le chapitre, lui, est celui du jour de la semaine — le site le décide. La');
p('bibliothèque fournit les sept images ; la navigation les parcourt.');
p();

writeFileSync(join(RACINE, 'docs/plan-des-54-semaines.md'), `${lignes.join('\n')}\n`);
console.log(`docs/plan-des-54-semaines.md — ${SEMAINES.length} semaines, ${CHAPITRES.length} chapitres, ${SEMAINES.length * IMAGES_DE_LA_SEMAINE.length} images attendues.`);
