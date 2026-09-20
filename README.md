# BIBLIOTHÈQUE SUPER MAGAZINE

La bibliothèque d'images de **AIME MAGAZINE** — le magazine de mariage qui
couvre les 365 jours de l'année, un personnage par jour.

Ce dépôt est **le serveur et les liens du site** : il est servi tel quel
(liens bruts ou GitHub Pages, aucune étape intermédiaire). Le site est déjà
prêt à le consommer — les noms de fichiers, la déclaration de chaque image et
les cinq critères de choix sont écrits dans son code, et résumés ici.

> **Ce qui est documenté est cité ; ce qui est imaginé est signé.** Les deux
> ne se mélangent jamais. C'est la règle de la collection comme celle du
> magazine.

---

## L'état du chantier

| | |
| --- | --- |
| **Fiches** | **16 documentées** (prompt maître + cinq scènes écrits) · **330 amorcées** (le sens du prénom, souvent le métier par la tradition : une porte déjà ouverte) · **19 fêtes** (un texte, pas une biographie) — sur 365 |
| **Fonds de couverture** | **0 / 365 livrés** — les 365 attendent, et ils n'attendent personne |
| **Scènes** | **0 / 1 825 livrées** — 80 scènes ont leur brief (les 16 fiches documentées × 5 moments) |
| **Manifeste** | 0 déclaration — `manifeste.json` est prêt à être rempli |

L'état en direct, tout le temps :

```
npm run etat
```

Deux chantiers se tiennent, dans cet ordre :

1. **Documenter les jours** — 349 journées à documenter, par lots de 10 jours,
   avec les règles et la structure exacte dans
   [`docs/prompt-journees-pour-chatgpt.md`](docs/prompt-journees-pour-chatgpt.md).
   Chaque jour documenté débloque 5 scènes.
2. **Produire les images** — les 365 fonds d'abord (ils n'attendent personne),
   puis les scènes par journées documentées, par lots de 16 journées
   (16 personnages × 5 scènes = 80 images, l'aube d'abord). La méthode
   complète est dans [`LISEZ-MOI.md`](LISEZ-MOI.md).

## La carte du dépôt

```
images/                  365 dossiers MM-JJ — un par jour de l'année (existant)
manifeste.json           la déclaration de chaque image : fichier, moment,
                         lumière, couleur, dimensions, contenu, note
LISEZ-MOI.md             comment produire un lot : le personnage, sa fiche,
                         les cinq moments, la déclaration à remplir
scripts/                 les outils du chantier
  bibliotheque.mjs       lecture commune : le disque, le manifeste, les documents
  lots.mjs               le plan de production : etat | fonds [n] | scenes [n]
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

| Le site attend | Ce dépôt sert |
| --- | --- |
| `images/MM-JJ/` — un dossier par jour | les 365 dossiers existent |
| `couverture.jpg`, `aube.jpg`, `matin.jpg`, `midi.jpg`, `apres-midi.jpg`, `soir.jpg` — noms exacts | les fichiers posés aux noms exacts |
| `-2`, `-3` — des candidates de casting (trois rangs au plus) | les rangs posés dans l'ordre |
| `manifeste.json` — la déclaration des cinq champs | le manifeste, vérifié par `npm run verifier` |
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

## Les outils

```
npm run etat       le tableau de bord : fiches, fonds, scènes, manifeste,
                   prochains lots
npm run lot:fonds  le prochain lot de 16 fonds de couverture (matière, couleur,
                   fichier à poser, la déclaration modèle)
npm run lot:scenes le prochain lot de 16 journées documentées (le brief, les
                   moments restants, l'aube d'abord)
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
