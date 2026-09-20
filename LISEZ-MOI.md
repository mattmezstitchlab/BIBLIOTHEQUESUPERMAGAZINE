# LISEZ-MOI — comment produire un lot

Ce dépôt est la **bibliothèque d'images de AIME MAGAZINE** : il sert de
**serveur et de liens** au site. Le site attend des fichiers, des noms exacts,
et une déclaration par image. Tout le reste — l'outil de génération, le
rythme, les lots — est liberté, et c'est écrit ici.

**La règle de la maison, avant tout le reste :** ce qui est documenté est
cité ; ce qui est imaginé est signé. On n'illustre pas ce qu'on n'a pas
documenté, et on n'écrit pas ce qu'on ne sait pas.

---

## 1. Ce que le site attend, sans négociation

1. **Un dossier par jour de l'année**, au format `MM-JJ` — les 365 dossiers
   existent déjà : `images/01-01/` … `images/12-31/`.
2. **Six plans par jour**, avec des noms de fichiers **exacts** :

   ```
   images/MM-JJ/couverture.jpg      le fond de la couverture
   images/MM-JJ/aube.jpg            les cinq moments de lumière
   images/MM-JJ/matin.jpg
   images/MM-JJ/midi.jpg
   images/MM-JJ/apres-midi.jpg
   images/MM-JJ/soir.jpg
   ```

   La **nuit n'a pas d'image** : elle garde le dessin du site. C'est une
   règle, pas un manque.

3. **Trois rangs par plan**, quand il y a plusieurs candidates : le premier
   est celui qu'on veut, les autres sont des candidates de casting :

   ```
   images/MM-JJ/couverture.jpg · couverture-2.jpg · couverture-3.jpg
   ```

4. **Deux familles d'images, pas au même point :**
   - **365 fonds de couverture** — un par jour, disponibles tout de suite :
     une matière du jour, sans visage ni objet identifiable, qui tient du
     texte par-dessus ;
   - **1 825 scènes** — cinq moments par jour, **le même personnage cinq
     fois**. Une scène ne se produit que si le personnage est documenté.
     L'**AUBE est l'image de référence** : les quatre autres gardent le même
     visage, la même silhouette, le même stylisme — seule la lumière change.

5. **La déclaration de chaque image**, dans `manifeste.json` à la racine.
   Une image qui ne peut pas déclarer ces cinq champs ne sert à rien : la
   déclaration fait partie de l'image.

Le site prend **la photo là où elle est**, et garde **son dessin partout
ailleurs** : une image manquante ne casse jamais une page.

## 2. Le format

- portrait **5 / 7** — le format de la couverture — **1000 × 1400** ;
- 85 mm ou 50 mm, ouverture ouverte ; le personnage à mi-corps, souvent de
  trois-quarts ;
- une source principale, un fond travaillé, aucune lumière plate ;
- grain fin, couleurs désaturées **sauf la couleur de la saison** — la
  couleur du jour est dans le tableau des fonds (`docs/casting-des-couvertures.md`,
  section 4), et la saison est dans la fiche du jour.

## 3. La direction artistique — écrite une fois, ne se réinvente pas

photographie éditoriale de mode, pas une illustration · une véritable
direction de casting : un visage, un âge, une silhouette tenus · stylisme
contemporain, matières nobles, coupes nettes · mise en scène cinématographique,
une intention par image · composition très haut de gamme, le sujet respirant
dans le cadre · l'esthétique d'un magazine international, pas d'un catalogue
· fond et lumière maîtrisés : une source décidée, une ombre assumée.

**Interdits** (ils sont dans le prompt, et ils se vérifient sur l'image) :
texte dans l'image, logo, filigrane · auréole, nimbe, cierge, statue, vitrail,
calice, crucifix · sourire publicitaire, pose de catalogue · décor de carte
postale, monument reconnaissable au premier plan · surcroît de détails : une
intention par image, le reste est vide · aucun kitsch religieux : la personne
est un personnage de magazine, jamais une icône · pas d'illustration, pas de
cartoon, pas de rendu 3D lisse · pas de silhouette anonyme ni de foule.

## 4. Produire un lot, pas à pas

### 0 — L'état des lieux

```
npm run etat
```

Fiches prêtes, fonds livrés, scènes livrées, et le prochain lot de chaque
famille. On ne produit pas à l'aveugle.

### 1 — Un lot de FONDS DE COUVERTURE (16 journées)

```
node scripts/lots.mjs fonds
```

Le lot donne, pour chaque jour : le titre, la couleur, le fichier à poser.
Pour chaque fond :

1. Lire la règle : **une matière du jour** — pas un visage, pas un objet
   identifiable, un fond qui tient sous du texte. La couleur du jour est
   donnée ; la matière n'est pas illustrative, elle est du jour (sa saison,
   sa fête, son caractère).
2. Poser le fichier : `images/MM-JJ/couverture.jpg`.
3. Mettre au format — **toujours**, l'outil de génération ne rend pas du 5 / 7 :
   ```
   npm run normaliser            tout ce qui est posé et hors format
   npm run normaliser 01-17      un seul jour
   npm run normaliser --sec      ne rien écrire, montrer
   ```
   Le script recadre au centre au plus près du 5 / 7 puis redimensionne à
   1000 × 1400. **Il ne déforme jamais** : on rogne des pixels de bord, on
   n'étire pas un visage. C'est ce recadrage qui fait passer le cadrage du
   manifeste (`largeur * 7 === hauteur * 5`).
4. Déclarer l'image (section 5) : `npm run declarer images/MM-JJ/couverture.jpg
   --lumiere "…" --contient "…, matière du jour"`.

Les fonds **n'attendent personne** : c'est la première phase, les 365 d'abord.

### 2 — Un lot de SCÈNES (16 journées documentées × 5 moments = 80 images)

```
node scripts/lots.mjs scenes
```

Le lot donne, pour chaque jour : le personnage, le brief, et les moments
restants. Pour chaque journée :

1. **Lire le brief** : `docs/prompts-maitres.md`, la section du personnage —
   le prompt maître (l'identité, l'interprétation, la direction de casting
   avec ses signes tenus) et les cinq scènes (lumière, posture, décor,
   énergie, stylisme, narration pour chaque moment).
2. **L'AUBE d'abord** : c'est l'image de référence. On la produit, on la
   retient — le visage, la silhouette, la garde-robe, les signes tenus.
3. **Les quatre autres sur la même référence** : même personnage, même
   stylisme — seule la lumière change (et la posture, le décor, l'énergie,
   la narration que le brief dit moment par moment).
4. Poser les fichiers : `images/MM-JJ/aube.jpg` … `images/MM-JJ/soir.jpg`.
5. Mettre au format : `npm run normaliser` (section 1, point 3).
6. Déclarer chaque image (section 5).

**On ne produit que des journées documentées.** Le lot ne prend que des
jours dont l'état est « prête ». Un jour sans fiche n'a pas de brief, et un
brief ne s'invente pas.

### 3 — Clôturer le lot

```
npm run verifier    le manifeste tient-il ? chaque lien existe-t-il ?
npm run relever     ce qui est arrivé, compté
git add -A && git commit -m "…" && git push
```

Le vérificateur est le juge : zéro erreur, sortie 0. Un avertissement
(image posée sans déclaration, rang 2 sans rang 1) se règle avant le commit.

## 5. La déclaration — format exact

Chaque image produite porte sa déclaration dans `manifeste.json` :

```json
{
  "fichier": "images/09-21/midi-2.jpg",
  "moment": "midi",
  "lumiere": "dure, studio, graphique",
  "couleur": "#86B87F",
  "largeur": 1000,
  "hauteur": 1400,
  "contient": ["matthieu", "portrait"],
  "note": "candidate 2 — ombre plus nette"
}
```

| champ | ce qu'il dit |
| --- | --- |
| `fichier` | le chemin réel, dans ce dépôt : `images/MM-JJ/slot[-2\|-3].jpg` |
| `moment` | `couverture` · `aube` · `matin` · `midi` · `apres-midi` · `soir` — cohérent avec le nom de fichier |
| `lumiere` | la lumière telle qu'elle est dans l'image (et celle du moment) |
| `couleur` | la dominante, en `#RRGGBB` — proche de la couleur du jour |
| `largeur` / `hauteur` | les dimensions réelles — le ratio attendu est 5 / 7 |
| `contient` | ce qu'on y voit : le personnage, le sujet, le décor |
| `note` | libre : le rang, la raison de la candidate, ce qui la distingue |

### Le déclarer sans recopier à la main

```
npm run declarer images/09-21/midi-2.jpg \
  --lumiere "dure, studio, graphique, une ombre nette" \
  --contient "matthieu, portrait, fond plein" \
  --note "candidate 2 — ombre plus nette"
```

L'outil **lit dans le fichier** ce qui ne doit pas se recopier : le jour et le
plan (dans le nom), le rang (`-2`, `-3`), la largeur et la hauteur (dans
l'en-tête JPEG) ; et il prend par défaut **la couleur du jour** telle que le
casting la donne. Il ne demande que ce qui est un regard : la lumière, ce
qu'on voit, la note. `--couleur "#RRGGBB"` pour forcer une dominante réelle
qui s'écarte du jour.

Il refuse : un chemin hors convention, un jour qui n'existe pas, un plan
inconnu (la nuit n'a pas d'image), un fichier absent, un JPEG illisible, un
cadrage qui n'est pas du 5 / 7, une couleur qui n'est pas un `#RRGGBB`, une
lumière ou un `contient` vides, une image déjà déclarée. Rien n'entre au
manifeste par accident ; une candidate dont le premier rang manque est
signalée sans être refusée.

## 6. Le casting — quand il y a plusieurs candidates

On ne choisit pas « la plus belle » — ça ne veut rien dire. On choisit
**celle qui répond au brief**, et **on dit pourquoi** :

| critère | poids | ce qu'on regarde |
| --- | --- | --- |
| le moment | 3 | l'image montre-t-elle bien l'aube, le midi, le soir ? |
| la lumière | 2 | la lumière décrite est-elle celle du moment ? |
| la couleur | 2 | la dominante est-elle proche de la couleur du jour ? |
| le cadrage | 1 | est-ce bien du 5 / 7 ? |
| le sujet | 1 | voit-on ce que la scène demande ? |

Ce que la déclaration porte (moment, lumière, couleur, dimensions, contenu)
suffit à noter. **À égalité, c'est le premier rang qui reste** : l'ordre des
fichiers est un ordre.

## 7. Quand une journée est documentée, la production débloque

Le circuit :

1. Un lot de 10 jours est documenté (les règles et la structure exacte du
   bloc attendu sont dans `docs/prompt-journees-pour-chatgpt.md`).
2. La fiche rentre dans `src/lib/profilsEditoriaux.ts` (le profil, ses ponts,
   son casting, ses inspirations — et rien d'inventé).
3. `npm run prompts` régénère les trois documents : `prompts-maitres.md`
   (le brief du personnage et ses cinq scènes), `fiches-de-l-annee.md`
   (l'état de la journée), `casting-des-couvertures.md` (le jour passe à
   « prête »).
4. Le jour entre dans les lots de scènes : `node scripts/lots.mjs scenes`.

**Ce qui n'est pas sûr reste vide**, et la fiche dit « à documenter » plutôt
que d'inventer. Un champ vide n'est pas un trou : c'est nommé.

## 8. Les liens — ce que le site appelle

Le dépôt est servi **tel quel** : les liens bruts (raw) ou GitHub Pages sont
les URLs du site. Aucune étape intermédiaire.

```
https://raw.githubusercontent.com/<depot>/<branche>/images/MM-JJ/slot.jpg
```

Le site tient ses images sous `/images/magazine/MM-JJ/slot.jpg` ; ce dépôt
les tient sous `images/MM-JJ/slot.jpg`. La même image, deux adresses — le
dépôt est la source.
