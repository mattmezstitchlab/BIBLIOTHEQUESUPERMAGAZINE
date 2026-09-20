# Les anciens assets — inventaire et remappage proposé

> **Engendré par** `npm run remapper`. Ce document **ne déplace rien** : il compte
> ce qui existe, dit à quoi ça ressemble, et propose des destinations. La
> décision de remapper appartient à la validation.

---

## 1. Pourquoi ce document

L’architecture éditoriale a changé : on n’écrit plus **365 jours = 365
magazines**, mais **54 semaines = 54 magazines**, chacune avec **7 chapitres**.
Les assets produits sous l’ancien modèle ne sont ni faux ni perdus — ils sont
**hors modèle**. Ce document les recense pour qu’on décide, en connaissance de
cause, lesquels remapper et lesquels garder en archive.

**Rien n’a été détruit, renommé ni déplacé.**

---

## 2. Ce qui existe aujourd’hui

| famille | où | nombre | état |
| --- | --- | --- | --- |
| Couvertures-jour (« matière du jour ») | `images/MM-JJ/couverture.jpg` | **52** | déclarées, vérifiées |
| Scènes (aube → soir, un personnage) | `images/MM-JJ/{aube,matin,midi,apres-midi,soir}.jpg` | **25** | déclarées, vérifiées |
| Candidates de casting (rangs 2 et 3) | `images/MM-JJ/*-2.jpg`, `*-3.jpg` | **0** | — |
| Dossiers de jour créés | `images/MM-JJ/` | 365 | vides, sauf les jours travaillés |
| Déclarations à l’ancien manifeste | `manifeste.json` | **77** | vérificateur des jours : sortie 0 |

**Total d’images réelles : 77.**

---

## 3. Les couvertures-jour — ce qu’elles sont, vraiment

Ce sont des **matières du jour** : aucune personne, aucun visage, aucun objet
identifiable, aucune foule, aucun texte. Une couleur dominante, une seule source
de lumière, un accident de lumière assumé, un cadre large et calme où du texte
peut tenir. La règle de production était : *« une matière sans lumière ne tient
pas un titre de couverture »*.

Dans le vocabulaire du nouveau brief, ce sont des couvertures de type
**« matière »** — une des formes admises, à côté de la photographie de mode,
l’architecture, le portrait, la nature, la gastronomie, l’objet, le voyage, la
musique, la danse, le cinéma, la culture, l’art, le paysage, la scène de vie et
la photographie conceptuelle.

### Par mois, avec leur saison dans la nouvelle grille

| mois | couvertures | saison | semaines correspondantes |
| --- | --- | --- | --- |
| 01 | 31 (du 01-01 au 01-31) | hiver | semaine 01 → 05 |
| 02 | 21 (du 02-01 au 02-21) | hiver | semaine 05 → 08 |

**Le constat qui compte :** ces matières ont été produites pour les semaines
**01 à 09** de la nouvelle grille (janvier et février). Elles portent toutes la
palette de l’hiver — bleu nuit `#16233F`, noir `#0B0B0F`, `#0d1526`. Ce sont
donc des candidates naturelles pour les semaines d’hiver, et un contre-emploi
pour les semaines d’été ou d’automne.

---

## 4. Les scènes — ce qu’elles sont, vraiment

Cinq moments (l’aube, le matin, le midi, l’après-midi, le soir) du **même
personnage**, tenu sur une image de référence. Chaque journée documentée a
donné cinq scènes.

| journée | personnage | scènes | saison | semaine |
| --- | --- | --- | --- | --- |
| 02-14 | valentin | 5/5 | hiver | 07 |
| 03-17 | patrick | 5/5 | hiver | 12 |
| 05-16 | honoré | 5/5 | printemps | 21 |
| 06-24 | jean-baptiste | 5/5 | été | 26 |
| 07-12 | véronique | 5/5 | été | 29 |

Ces scènes racontent **un personnage, une journée, sa lumière**. Dans le
nouveau modèle elles ne sont pas perdues : elles sont des **portraits** — la
forme la plus proche du chapitre **01 — Les amoureux** (« émotions, relation
humaine ») et, pour les plus documentaires (le tirage de Véronique, le livre
d’or de Jean-Baptiste), du chapitre **07 — Les souvenirs**.

Elles ont un défaut pour le nouveau modèle : **elles montrent une personne,
pas un couple**. Si les amoureux doivent être deux, elles ne conviennent pas —
il faut le dire avant de les remapper.

---

## 5. Les destinations possibles — trois options, et ce qu’elles coûtent

### Option A — Les matières servent de couvertures d’hiver

Les couvertures-jour des jours 01-01 → 02-21 sont remappées vers les semaines
01 à 09 de la nouvelle grille, en `cover.jpg`. Les scènes restent en réserve
pour le chapitre 01.

- **Ce que ça donne** : jusqu’à 9 couvertures servies immédiatement, sans une
  seule nouvelle génération.
- **Ce que ça coûte** : une couverture de magazine doit *annoncer l’univers de
  la semaine* ; une matière seule annonce une atmosphère, pas un univers. Il
  faudra vérifier semaine par semaine que le concept du plan est tenu par
  l’image — et remplacer ce qui ne tient pas.
- **Ce qui est déplacé** : des fichiers (copie vers `images/semaine-NN/`), et
  des lignes de manifeste. L’ancien dossier **reste en place**.

### Option B — Les matières servent d’images de chapitre

Les mêmes images deviennent les `04-recevoir.jpg` ou `03-lieux.jpg` de
certaines semaines, quand le chapitre est une matière (une table, une pierre,
un tissu).

- **Ce que ça donne** : le chapitre reçoit une image déjà juste
  techniquement (5 / 7, sans visage, sans texte).
- **Ce que ça coûte** : un chapitre doit être **immédiatement identifiable**
  comme son univers. Une matière abstraite ne dit pas « l’art de recevoir » —
  il faudra de toute façon des images avec la table, les objets, les gestes.
- **Ce qui est déplacé** : les mêmes fichiers.

### Option C — Archive, et rien d’autre

Les 77 images restent où elles sont, avec leur manifeste, leurs URLs et leur
vérificateur. La bibliothèque des semaines part de zéro.

- **Ce que ça donne** : aucune ambiguïté. L’ancienne URL continue de servir, et
  rien du travail passé ne peut se retrouver mal placé.
- **Ce que ça coûte** : 77 images produites et déclarées qui ne servent pas au
  nouveau modèle.

---

## 6. Ce qui doit être remappé — la liste courte

| à remapper | nombre | vers | pourquoi |
| --- | --- | --- | --- |
| Couvertures-jour d’hiver (01-01 → 02-28) | 52 | `semaine-01` → `semaine-09` / `cover.jpg` | même saison, même palette, même forme (« matière ») |
| Scènes complètes (journées à 5 moments) | 5 journées | chapitre `01-amoureux` ou `07-souvenirs` | ce sont des portraits tenus, pas des illustrations |
| Candidates de casting (rangs 2-3) | — | nulle part | aucune n’a été produite à ce jour |

**Ce qui ne doit pas être remappé :** les dossiers de jour vides (365), qui ne
servent plus à rien dans le nouveau modèle — leur suppression est une décision
séparée, et elle n’a pas été prise.

---

## 7. Ce que le remappage ne ferait pas

- **Il ne renommerait pas** `images/MM-JJ/` en `images/semaine-NN/` : ce sont
  deux structures différentes, pas deux écritures du même nom.
- **Il ne toucherait pas** au manifeste des jours : il reste la déclaration de
  ce qui a été produit sous l’ancien modèle.
- **Il ne franchirait pas la frontière des saisons** : une matière d’hiver ne
  devient pas une couverture d’août.

---

## 8. Ce qui a été décidé — 20 septembre 2026

**Option C : archive, et rien d’autre.** Les 77 images restent où elles sont, avec
leurs URLs, leur manifeste et leur vérificateur. **Aucun remappage n’a lieu.** La
bibliothèque des 54 semaines part de zéro.

| question | décision | effet |
| --- | --- | --- |
| Les 52 matières | **archive** | `images/MM-JJ/` continue de servir ; rien ne bouge |
| Les 25 scènes | **archive** | elles restent des journées complètes de l’ancien modèle |
| Le chapitre « Les amoureux » | **deux personnes** | les scènes, qui montrent une personne seule, ne peuvent pas y prétendre — c’est écrit dans `scripts/semaines.mjs` (`REGLES_DE_CHAPITRE`) et rappelé par `npm run semaines:lot` |
| Les 365 dossiers de jour vides | **gardés** | ils restent pour mémoire ; leur suppression est une décision séparée |
| Le format de la collection | **A4 portrait, 1240 × 1754** | ce n’est pas du 5 / 7 — le normaliseur et le vérificateur savent lequel s’applique à quel dossier |

**Ce que ça veut dire concrètement :** l’ancienne bibliothèque est un témoin, pas
un gisement. Le nouveau modèle ne réutilise rien d’elle — et ne dépend donc de
rien de ce qu’elle contient.

---

## 9. Ce que le remappage n’aurait pas fait

- **Il n’aurait pas renommé** `images/MM-JJ/` en `images/semaine-NN/` : ce sont
  deux structures différentes, pas deux écritures du même nom.
- **Il n’aurait pas touché** au manifeste des jours : il reste la déclaration de
  ce qui a été produit sous l’ancien modèle.
- **Il n’aurait pas franchi la frontière des saisons** : une matière d’hiver ne
  devient pas une couverture d’août.

