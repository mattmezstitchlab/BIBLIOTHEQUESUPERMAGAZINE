# BIBLIOTHÈQUE SUPER MAGAZINE

La bibliothèque d'images de **AIME MAGAZINE**.

> ## ⚠️ CHANGEMENT D'ARCHITECTURE ÉDITORIALE
>
> **L'ancien modèle — 365 jours = 365 magazines — est abandonné.**
>
> **Le nouveau modèle : 54 SEMAINES = 54 MAGAZINES.**
> Chaque magazine hebdomadaire contient **7 CHAPITRES = 7 UNIVERS DU MARIAGE**.
> Une année. 54 magazines. 7 univers par magazine. 365 jours pour les explorer.
>
> La bibliothèque à produire : **54 couvertures + 378 images de chapitres = 432 images.**
> Les 365 dates ne deviennent **pas** 365 images : le site fera le mapping
> `DATE → SEMAINE → CHAPITRE`.
>
> **Ce qui existait sous l'ancien modèle est intact** — rien n'a été détruit,
> renommé ni déplacé. Voir [`docs/remappage-anciens-assets.md`](docs/remappage-anciens-assets.md)
> pour l'inventaire et les options de remappage, qui attendent validation.

---

## Le nouveau modèle, en une image

```
images/
  semaine-01/
    cover.jpg          la couverture — la porte d'entrée du magazine
    01-amoureux.jpg    les sept chapitres — les sept mêmes univers
    02-style.jpg       chaque semaine, traités autrement
    03-lieux.jpg
    04-recevoir.jpg
    05-fete.jpg
    06-monde.jpg
    07-souvenirs.jpg
  …
  semaine-54/
```

- **54 couvertures** + **378 images de chapitres** = **432 images**.
- La couverture annonce l'univers de la semaine. **Pas de mariés par défaut** :
  le mariage se suggère par son univers culturel, esthétique, humain ou
  émotionnel — une robe, une table, une ville, une chanson, une famille, un
  voyage, un objet transmis, une architecture.
- Les sept images d'une semaine **se répondent** : palette, lumière, saison,
  texture, territoire, ambiance partagés. Chaque chapitre reste identifiable.

**Le plan complet, semaine par semaine** (dates, saison, titre, style, palette,
idée de couverture, fil, huit fichiers attendus) est engendré automatiquement :

```
npm run plan     →  docs/plan-des-54-semaines.md
```

Il ne s'écrit pas à la main : il vient de [`scripts/semaines.mjs`](scripts/semaines.mjs).
Une semaine change là-bas, le plan suit.

---

## L'état des deux bibliothèques

### La bibliothèque des 54 semaines (le modèle en cours)

| | |
| --- | --- |
| **Structure** | 54 dossiers `semaine-NN/` — la semaine 01 est livrée |
| **Manifeste** | `manifeste-semaines.json` — 13 champs par image, **8 déclarations** |
| **Images livrées** | **8 / 432** — la semaine 01 « Noir gelé », complète |
| **Décision prise** | **archive pure** : l'ancienne bibliothèque reste en place, rien n'est remappé |

```
npm run semaines:etat           où en est la bibliothèque, quel est le prochain lot
npm run semaines:lot 7          ce que demande la semaine 07, ses huit fichiers
npm run semaines:verifier       le manifeste tient-il ? (sortie 0/1)
npm run declarer:semaine …      déclarer une image livrée
npm run noir-et-blanc …         mettre des images en noir et blanc, quand le fil l'exige
npm run normaliser semaine-01   mettre un dossier au format A4, sans le déformer
```

### La bibliothèque des jours (l'ancien modèle — intacte, en réserve)

| | |
| --- | --- |
| **Fonds de couverture** | **52 / 365 livrés** — les « matières du jour », produites pour janvier et février |
| **Scènes** | **25 / 1 825 livrées** — 5 journées complètes, l'aube servant de référence |
| **Manifeste** | `manifeste.json` — 77 déclarations, vérificateur sortie 0 |

Ses outils continuent de fonctionner tels quels (`npm run etat`, `lot:fonds`,
`lot:scenes`, `relever`, `verifier`). **Fusionner ou supprimer cette
bibliothèque est une décision, pas une conséquence** — elle attend la réponse
aux trois questions du rapport de remappage.

---

## La carte du dépôt

```
images/semaine-01…54/    54 dossiers — LE MODÈLE EN COURS : cover.jpg + les sept
                         chapitres (01-amoureux … 07-souvenirs), 8 images chacun
manifeste-semaines.json  la déclaration des 432 images attendues : semaine,
                         chapitre, titre, univers, saison, style, sujet,
                         dominante_color, description, mots_cles (+ fichier,
                         largeur, hauteur)
images/MM-JJ/            365 dossiers — L'ANCIEN MODÈLE, intact : les matières
                         du jour et les scènes, 77 images
manifeste.json           la déclaration des images de l'ancien modèle
LISEZ-MOI.md             comment produire un lot : le personnage, sa fiche,
                         les cinq moments, la déclaration à remplir
scripts/                 les outils du chantier
  bibliotheque.mjs       lecture commune de l'ancien modèle (le disque, le manifeste)
  semaines.mjs           LA SOURCE DU NOUVEAU MODÈLE : les 54 semaines, leurs
                         titres, styles, palettes, couvertures et fils ; les sept
                         chapitres ; le découpage de l'année et les saisons
  plan-semaines.mjs      engendre docs/plan-des-54-semaines.md (npm run plan)
  lots-semaines.mjs      les lots du nouveau modèle : etat | semaine NN | prochaine
  verifier-semaines.mjs  le juge des semaines : semaine, chapitre, titre, saison,
                         couleur, cadrage, fichiers (npm run semaines:verifier)
  remapper.mjs           l'inventaire des anciens assets et les options de
                         remappage — lecture seule, ne déplace rien (npm run remapper)
  lots.mjs               le plan de production de l'ancien modèle : etat | fonds | scenes
  relever-images.mjs     ce qui est réellement arrivé, compté (npm run relever)
  verifier-manifeste.mjs le juge : les cinq champs, les liens, l'ordre (npm run verifier)
  faire-prompts.ts       régénère les trois documents de docs/ (npm run prompts)
docs/                    les documents du chantier
  prompt-journees-pour-chatgpt.md   LA règle de documentation : la chaîne
                          DATE → SAINT → PERSONNAGE → … → MARIAGE, les quatre
                          niveaux de pont (directe, culturelle, éditoriale,
                          inspiration), la structure exacte du bloc par jour
  prompt-bibliotheque-images.md     LE contrat de la bibliothèque : ce que le
                          site attend, sans négociation
  prompts-maitres.md     ENGENDRÉ — les 16 fiches prêtes : le prompt maître et
                          les cinq scènes de chaque personnage (le brief des
                          80 scènes)
  fiches-de-l-annee.md   ENGENDRÉ — les 365 fiches : tout ce qu'on sait d'un
                          jour, et ce qui lui manque, nommé
  casting-des-couvertures.md  ENGENDRÉ — la liste de ce qui est attendu : les
                          365 fonds (titre, couleur, fichier), les 1 825 scènes
                          (personnage, moment, état, fichier)
  plan-des-54-semaines.md     ENGENDRÉ — les 54 magazines : dates, saison, titre,
                          style, palette, idée de couverture, fil, huit fichiers
  remappage-anciens-assets.md ENGENDRÉ — ce qui existe sous l'ancien modèle, et
                          les trois options de remappage, en attente de validation
src/lib/                 les modules de données, mot pour mot ceux du site
  profilsEditoriaux.ts   les 16 fiches documentées (PROFILS) — ici qu'une
                         journée documentée rentre
  saintsDuJour.ts        le calendrier : les 365 jours nommés
  prenoms.ts             les étymologies — elles se transmettent, elles ne
                         s'inventent pas
  patronages.ts          les 54 métiers des saints patrons, tels qu'ils sont
                         transmis
  couvertureDuJour.ts    la saison, la couleur, la carte, la semaine de chaque
                         jour
  promptsVisuels.ts      le système de prompts : la direction artistique, les
                         cinq moments en images, le prompt maître
  castingVisuels.ts      les 365 + 1 825 attendus, les rangs, l'état du casting
  fichesAnnee.ts         la fiche d'un jour, composée de toutes les sources
  …                      (calendrier, couleurs, moments, jeuDeCartes,
                         jourDuMagazine, aimeMoteur — ce dernier en stub :
                         moteur du site, jamais utilisé ici, voir son en-tête)
01a0b6bc-….patch         la source du site, déposée en référence : c'est elle
                         qui a fourni les modules et les documents ci-dessus
```

## Le contrat avec le site

### Le modèle en cours — les 54 semaines

| Le site attend | Ce dépôt sert |
| --- | --- |
| `images/semaine-NN/` — un dossier par semaine | les 54 dossiers existent |
| `cover.jpg`, `01-amoureux.jpg`, `02-style.jpg`, `03-lieux.jpg`, `04-recevoir.jpg`, `05-fete.jpg`, `06-monde.jpg`, `07-souvenirs.jpg` — noms exacts | les noms sont fixés dans `scripts/semaines.mjs`, une seule source |
| `manifeste-semaines.json` — semaine, chapitre, titre, univers, saison, style, sujet, dominante_color, description, mots_cles | le schéma est en place, vérifié par `npm run semaines:verifier` |
| le mapping `DATE → SEMAINE → CHAPITRE` | la règle est écrite : `semaineDuJour()` dans `scripts/semaines.mjs` |
| A4 portrait, 1240 × 1754 | le format de la collection — le normaliseur recadre, jamais il n'étire |
| le chapitre « Les amoureux » montre **deux personnes** | la règle est dans `scripts/semaines.mjs` (`REGLES_DE_CHAPITRE`) et rappelée par `npm run semaines:lot` |
| les liens bruts / GitHub Pages | le dépôt servi tel quel |

### L'ancien modèle — les jours (toujours servi)

| Le site attend | Ce dépôt sert |
| --- | --- |
| `images/MM-JJ/` — un dossier par jour | les 365 dossiers existent |
| `couverture.jpg`, `aube.jpg`, `matin.jpg`, `midi.jpg`, `apres-midi.jpg`, `soir.jpg` — noms exacts | les fichiers posés aux noms exacts |
| `-2`, `-3` — des candidates de casting (trois rangs au plus) | les rangs posés dans l'ordre |
| `manifeste.json` — la déclaration des cinq champs | le manifeste, vérifié par `npm run verifier` |
| `images/MM-JJ/couverture.jpg` — les fonds | 16/365 livrés (01-01 → 01-16) |
| 5 / 7 portrait, 1000 × 1400 | le format imposé par la vérification |
| les liens bruts / GitHub Pages | le dépôt servi tel quel |

Le site tient ses images sous `/images/magazine/MM-JJ/slot.jpg` ; ce dépôt les
tient sous `images/MM-JJ/slot.jpg`. **Une image manquante ne casse jamais une
page** : là où il n'y a pas de photo, le dessin du site reste. Et **la nuit
n'a pas d'image** — c'est la queue de la veille, une règle, pas un manque.

## Les règles de la maison

1. **Un fait se cite, une interprétation se signe.** Les deux ne se mélangent
   jamais : l'identité d'un prompt ne contient que du documenté ; le casting,
   le stylisme, la mise en scène sont signés comme interprétation.
2. **Ce qui n'est pas documenté n'est pas écrit** — un champ vide reste vide,
   et il est nommé (« à documenter »).
3. **On n'illustre pas ce qu'on n'a pas documenté.** Un jour sans fiche n'a
   pas de prompt maître, et pas de scène. Les 349 jours à documenter n'ont
   que leur nom, leur saison et leur lumière.
4. **Quatre niveaux de correspondance vers le mariage, jamais mélangés** :
   directe (documentée), culturelle (documentée, plus large), éditoriale
   (une association créative, assumée comme telle), inspiration (une création
   pure — on imagine, on ne raconte pas).
5. **Aucune biographie inventée** : uniquement des personnes réelles du
   calendrier ou de l'histoire.
6. **Aucun kitsch religieux** : la personne est un personnage de magazine,
   jamais une icône — pas d'auréole, pas de vitrail, pas de cierge.
7. **Le même personnage cinq fois** : même visage, même silhouette, même
   garde-robe — seule la lumière change. L'aube est la référence.
8. **Une semaine, une personnalité** : les sept chapitres d'un magazine se
   répondent — même palette, même lumière, même saison, même territoire ;
   mais les 54 semaines ne se ressemblent pas. Quand le fil d'une semaine
   l'exige (« tout en noir et blanc, sauf une image »), le fil est **appliqué**,
   pas souhaité : `npm run noir-et-blanc` le rend vrai.

## Les outils — la bibliothèque des semaines

```
npm run plan              engendre le plan des 54 semaines
npm run semaines:etat     l'état : semaines complètes, prochain lot
npm run semaines:lot 7    ce que demande une semaine, ses huit fichiers
npm run semaines:verifier le manifeste tient-il ? (sortie 0/1)
npm run remapper          l'inventaire et les options de remappage (lecture seule)
```

## Les outils — la bibliothèque des jours (ancien modèle, toujours fonctionnels)

```
npm run etat       le tableau de bord : fiches, fonds, scènes, manifeste,
                   prochains lots
npm run lot:fonds  le prochain lot de 16 fonds de couverture (matière, couleur,
                   fichier à poser, la déclaration modèle)
npm run lot:scenes le prochain lot de 16 journées documentées (le brief, les
                   moments restants, l'aube d'abord)
npm run declarer   déclare une image : lit jour, plan, rang et dimensions
                   dans le fichier, ne demande que le regard (lumière, contenu)
npm run normaliser toute image au 5/7 exact (recadrage centré, jamais étiré)
npm run relever    ce qui est réellement arrivé dans images/, compté
npm run verifier   le manifeste tient-il ? (sortie 0/1 — passe au CI)
npm run prompts    régénère les trois documents de docs/ — ils ne s'écrivent
                   pas à la main, donc ils ne peuvent pas diverger du site
```

Les deux premiers lots, tout de suite :

- **fonds** : `01-01` → `01-16` (16 fonds, 16 déclarations) ;
- **scènes** : `02-14` (Valentin) → `12-25` (Noël) — les 16 fiches prêtes,
  80 scènes, les briefs dans `docs/prompts-maitres.md`.

## La référence

Le fichier `01a0b6bc-3f08-731f-b6a8-3f8c1a665520.patch`, à la racine, porte la
source du site (dépôt séparé) au moment où cette bibliothèque a été rassemblée :
c'est elle qui a fourni les modules de `src/lib/` — copie **mot pour mot**,
vérifiée par régénération (`npm run prompts` reproduit byte pour byte les trois
documents de `docs/`) — et les deux prompts maîtres de `docs/`. Tout ce qui
appartient au site et non à la bibliothèque est signalé comme tel
(`src/lib/aimeMoteur.ts`, en stub).
