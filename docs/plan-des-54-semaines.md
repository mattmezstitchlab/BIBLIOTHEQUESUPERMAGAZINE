# Le plan des 54 semaines — 54 magazines, 7 chapitres

> **Engendré par** `npm run plan`. Ce document ne s’écrit pas à la main : il
> vient de `scripts/semaines.mjs`. Une semaine change là-bas, le plan suit.

**54 magazines** (un par semaine) · **7 chapitres** par magazine · **8 images** par
semaine · **432 images** en tout, en **A4 portrait (1240 × 1754)**. Chaque semaine porte les sept mêmes univers,
traités autrement : c’est la diversité des traitements, pas celle des sujets,
qui fait la collection.

**Le mariage est le territoire commun.** Il peut apparaître directement ou
indirectement — une robe, une table, une ville, une chanson, une famille, un
voyage, un objet transmis, une architecture. La règle absolue : ne pas produire
« des images de mariage », mais une bibliothèque éditoriale sur son univers.

---

## 1. Le découpage de l’année

365 jours ne se divisent pas en 54 semaines de 7 jours (54 × 7 = 378). Le
découpage est **proportionnel et régulier** : la semaine `n` couvre les jours
`⌊(n−1) × 365 / 54⌋ + 1` à `⌊n × 365 / 54⌋` de l’année. Chaque jour appartient à
exactement une semaine, aucune semaine n’est vide, et la règle se recalcule sans
table. **Le site reste maître du calendrier** : cette règle est écrite pour que
la bibliothèque sache à quelle saison appartient une semaine.

La saison d’une semaine est **celle de la majorité de ses jours** — aux dates
astronomiques : printemps le 20 mars, été le 21 juin, automne le 23 septembre,
hiver le 21 décembre.

| semaine | jours de l’année | dates | saison |
| --- | --- | --- | --- |
| 01 | 01-01 → 01-06 | 01-01 au 01-06 | hiver |
| 02 | 01-07 → 01-13 | 01-07 au 01-13 | hiver |
| 03 | 01-14 → 01-20 | 01-14 au 01-20 | hiver |
| 04 | 01-21 → 01-27 | 01-21 au 01-27 | hiver |
| 05 | 01-28 → 02-02 | 01-28 au 02-02 | hiver |
| 06 | 02-03 → 02-09 | 02-03 au 02-09 | hiver |
| 07 | 02-10 → 02-16 | 02-10 au 02-16 | hiver |
| 08 | 02-17 → 02-23 | 02-17 au 02-23 | hiver |
| 09 | 02-24 → 03-01 | 02-24 au 03-01 | hiver |
| 10 | 03-02 → 03-08 | 03-02 au 03-08 | hiver |
| 11 | 03-09 → 03-15 | 03-09 au 03-15 | hiver |
| 12 | 03-16 → 03-22 | 03-16 au 03-22 | hiver |
| 13 | 03-23 → 03-28 | 03-23 au 03-28 | printemps |
| 14 | 03-29 → 04-04 | 03-29 au 04-04 | printemps |
| 15 | 04-05 → 04-11 | 04-05 au 04-11 | printemps |
| 16 | 04-12 → 04-18 | 04-12 au 04-18 | printemps |
| 17 | 04-19 → 04-24 | 04-19 au 04-24 | printemps |
| 18 | 04-25 → 05-01 | 04-25 au 05-01 | printemps |
| 19 | 05-02 → 05-08 | 05-02 au 05-08 | printemps |
| 20 | 05-09 → 05-15 | 05-09 au 05-15 | printemps |
| 21 | 05-16 → 05-21 | 05-16 au 05-21 | printemps |
| 22 | 05-22 → 05-28 | 05-22 au 05-28 | printemps |
| 23 | 05-29 → 06-04 | 05-29 au 06-04 | printemps |
| 24 | 06-05 → 06-11 | 06-05 au 06-11 | printemps |
| 25 | 06-12 → 06-17 | 06-12 au 06-17 | printemps |
| 26 | 06-18 → 06-24 | 06-18 au 06-24 | été |
| 27 | 06-25 → 07-01 | 06-25 au 07-01 | été |
| 28 | 07-02 → 07-08 | 07-02 au 07-08 | été |
| 29 | 07-09 → 07-15 | 07-09 au 07-15 | été |
| 30 | 07-16 → 07-21 | 07-16 au 07-21 | été |
| 31 | 07-22 → 07-28 | 07-22 au 07-28 | été |
| 32 | 07-29 → 08-04 | 07-29 au 08-04 | été |
| 33 | 08-05 → 08-11 | 08-05 au 08-11 | été |
| 34 | 08-12 → 08-17 | 08-12 au 08-17 | été |
| 35 | 08-18 → 08-24 | 08-18 au 08-24 | été |
| 36 | 08-25 → 08-31 | 08-25 au 08-31 | été |
| 37 | 09-01 → 09-07 | 09-01 au 09-07 | été |
| 38 | 09-08 → 09-13 | 09-08 au 09-13 | été |
| 39 | 09-14 → 09-20 | 09-14 au 09-20 | été |
| 40 | 09-21 → 09-27 | 09-21 au 09-27 | automne |
| 41 | 09-28 → 10-04 | 09-28 au 10-04 | automne |
| 42 | 10-05 → 10-10 | 10-05 au 10-10 | automne |
| 43 | 10-11 → 10-17 | 10-11 au 10-17 | automne |
| 44 | 10-18 → 10-24 | 10-18 au 10-24 | automne |
| 45 | 10-25 → 10-31 | 10-25 au 10-31 | automne |
| 46 | 11-01 → 11-06 | 11-01 au 11-06 | automne |
| 47 | 11-07 → 11-13 | 11-07 au 11-13 | automne |
| 48 | 11-14 → 11-20 | 11-14 au 11-20 | automne |
| 49 | 11-21 → 11-27 | 11-21 au 11-27 | automne |
| 50 | 11-28 → 12-03 | 11-28 au 12-03 | automne |
| 51 | 12-04 → 12-10 | 12-04 au 12-10 | automne |
| 52 | 12-11 → 12-17 | 12-11 au 12-17 | automne |
| 53 | 12-18 → 12-24 | 12-18 au 12-24 | hiver |
| 54 | 12-25 → 12-31 | 12-25 au 12-31 | hiver |

---

## 2. Les 54 magazines

| semaine | dates | saison | titre | style dominant | palette |
| --- | --- | --- | --- | --- | --- |
| 01 | 01-01 → 01-06 | hiver | **Noir gelé** | noir et blanc, documentaire | `#0B0B0F` `#EDEDEA` |
| 02 | 01-07 → 01-13 | hiver | **Béton neige** | brutalisme, architecture | `#16233F` `#9AA3A8` |
| 03 | 01-14 → 01-20 | hiver | **La maison chaude** | intérieur, lumière chaude | `#3A2A1E` `#E9B44C` |
| 04 | 01-21 → 01-27 | hiver | **Nordique** | nordique, minimalisme | `#E8EAE6` `#6E7F8D` |
| 05 | 01-28 → 02-02 | hiver | **Or et givre** | luxe, matière précieuse | `#16233F` `#C9A227` |
| 06 | 02-03 → 02-09 | hiver | **Plateau** | cinéma, lumière de scène | `#0B0B0F` `#4C6E4C` |
| 07 | 02-10 → 02-16 | hiver | **Lanternes** | culture, fêtes d’hiver | `#0d1526` `#E9B44C` |
| 08 | 02-17 → 02-23 | hiver | **Moquette** | rétro, années 70 | `#6e342c` `#E9B44C` |
| 09 | 02-24 → 03-01 | hiver | **Les mains** | documentaire, métiers d’art | `#4C6E4C` `#D8D2C6` |
| 10 | 03-02 → 03-08 | hiver | **Blanc sur blanc** | minimalisme | `#EDEDEA` `#C9C4BA` |
| 11 | 03-09 → 03-15 | hiver | **Masque** | art, carnaval vénitien | `#0B0B0F` `#B8574A` |
| 12 | 03-16 → 03-22 | hiver | **La fonte** | nature, fin d’hiver | `#16233F` `#7FB77E` |
| 13 | 03-23 → 03-28 | printemps | **Jardin** | nature, jardin anglais | `#7FB77E` `#4C6E4C` |
| 14 | 03-29 → 04-04 | printemps | **Technicolor** | pop, couleur | `#E9B44C` `#B8574A` |
| 15 | 04-05 → 04-11 | printemps | **Méditerranée** | voyage, méditerranéen | `#7FB77E` `#16233F` |
| 16 | 04-12 → 04-18 | printemps | **La robe** | mode, éditorial | `#EDEDEA` `#B8574A` |
| 17 | 04-19 → 04-24 | printemps | **Champagne** | gastronomie, luxe | `#E9B44C` `#C9A227` |
| 18 | 04-25 → 05-01 | printemps | **Washi** | japonais, culture | `#EDEDEA` `#B8574A` |
| 19 | 05-02 → 05-08 | printemps | **Céramique** | décoration, art de vivre | `#D8D2C6` `#4C6E4C` |
| 20 | 05-09 → 05-15 | printemps | **Trottoir** | photographie de rue | `#16233F` `#E9B44C` |
| 21 | 05-16 → 05-21 | printemps | **Tirage** | photographie argentique | `#6e342c` `#D8D2C6` |
| 22 | 05-22 → 05-28 | printemps | **Potager** | gastronomie, nature | `#4C6E4C` `#E9B44C` |
| 23 | 05-29 → 06-04 | printemps | **Henné** | indien, culture | `#B8574A` `#E9B44C` |
| 24 | 06-05 → 06-11 | printemps | **Piano** | musique | `#0B0B0F` `#C9A227` |
| 25 | 06-12 → 06-17 | printemps | **La lettre** | mémoire, papeterie | `#D8D2C6` `#6e342c` |
| 26 | 06-18 → 06-24 | été | **Solstice** | art du feu, culture | `#0d1526` `#E9B44C` |
| 27 | 06-25 → 07-01 | été | **Grand bleu** | mer, nature | `#16233F` `#7FB77E` |
| 28 | 07-02 → 07-08 | été | **Sable et sel** | minimalisme, matière | `#D8D2C6` `#9AA3A8` |
| 29 | 07-09 → 07-15 | été | **Cuivres** | musique, fête | `#E9B44C` `#6e342c` |
| 30 | 07-16 → 07-21 | été | **Toscane** | voyage, italien, gastronomie | `#7FB77E` `#E9B44C` |
| 31 | 07-22 → 07-28 | été | **Piscine** | luxe, surréalisme | `#16233F` `#EDEDEA` |
| 32 | 07-29 → 08-04 | été | **Néons** | pop, fête foraine | `#B8574A` `#E9B44C` |
| 33 | 08-05 → 08-11 | été | **Couleur** | latin, danse | `#E9B44C` `#B8574A` |
| 34 | 08-12 → 08-17 | été | **Pieds nus** | documentaire, plage | `#D8D2C6` `#16233F` |
| 35 | 08-18 → 08-24 | été | **Fumée** | gastronomie, feu | `#6e342c` `#E9B44C` |
| 36 | 08-25 → 08-31 | été | **Wax** | africain, mode, culture | `#E9B44C` `#4C6E4C` |
| 37 | 09-01 → 09-07 | été | **Nuit blanche** | fête, DJ, scène | `#0B0B0F` `#B8574A` |
| 38 | 09-08 → 09-13 | été | **Route** | américain, voyage | `#E9B44C` `#16233F` |
| 39 | 09-14 → 09-20 | été | **Blé coupé** | nature, fin d’été | `#E9B44C` `#D8D2C6` |
| 40 | 09-21 → 09-27 | automne | **Brume** | nature, forêt | `#6E7F8D` `#4C6E4C` |
| 41 | 09-28 → 10-04 | automne | **Escalier** | architecture, patrimoine | `#9AA3A8` `#16233F` |
| 42 | 10-05 → 10-10 | automne | **Vendange** | gastronomie, terre | `#6e342c` `#4C6E4C` |
| 43 | 10-11 → 10-17 | automne | **Projecteur** | cinéma | `#0B0B0F` `#E9B44C` |
| 44 | 10-18 → 10-24 | automne | **Tartan** | mode, écossais | `#4C6E4C` `#6e342c` |
| 45 | 10-25 → 10-31 | automne | **Champignons** | art de recevoir | `#4C6E4C` `#6e342c` |
| 46 | 11-01 → 11-06 | automne | **Brumes du fleuve** | italien, voyage | `#9AA3A8` `#E9B44C` |
| 47 | 11-07 → 11-13 | automne | **Atelier** | art | `#D8D2C6` `#B8574A` |
| 48 | 11-14 → 11-20 | automne | **Trois âges** | documentaire, famille | `#6e342c` `#D8D2C6` |
| 49 | 11-21 → 11-27 | automne | **Vinyle** | musique, rétro | `#6e342c` `#E9B44C` |
| 50 | 11-28 → 12-03 | automne | **Salle des mariages** | documentaire, lieu | `#9AA3A8` `#B8574A` |
| 51 | 12-04 → 12-10 | automne | **Avent** | fin d’année, lumière | `#0d1526` `#E9B44C` |
| 52 | 12-11 → 12-17 | automne | **Noir** | noir et blanc, minimalisme | `#0B0B0F` `#EDEDEA` |
| 53 | 12-18 → 12-24 | hiver | **Rubans** | luxe, Noël contemporain | `#6e342c` `#C9A227` |
| 54 | 12-25 → 12-31 | hiver | **Minuit** | fête, réveillon | `#0B0B0F` `#E9B44C` |

---

## 3. Les sept chapitres — les mêmes, chaque semaine

| ordre | chapitre | fichier | univers |
| --- | --- | --- | --- |
| 01 | Les amoureux | `01-amoureux.jpg` | Couple, rencontre, engagement, famille, émotions, relation humaine |
| 02 | Le style | `02-style.jpg` | Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode |
| 03 | Les lieux | `03-lieux.jpg` | Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations |
| 04 | L’art de recevoir | `04-recevoir.jpg` | Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table |
| 05 | La fête | `05-fete.jpg` | Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit |
| 06 | Le monde | `06-monde.jpg` | Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux |
| 07 | Les souvenirs | `07-souvenirs.jpg` | Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire |

Les sept images d’une semaine ne sont pas sept images indépendantes : elles
fonctionnent ensemble comme les chapitres d’un même magazine — palette,
lumière, saison, texture, territoire ou ambiance partagés. Chaque chapitre
reste immédiatement identifiable.

---

## 4. Les sept univers, semaine par semaine

### Semaine 01 — Noir gelé

**01-01 au 01-06** · hiver · noir et blanc, documentaire · palette `#0B0B0F` `#EDEDEA`

**La couverture** — Une vitre gelée en noir et blanc, contrastée à bloc, comme un premier négatif.

**Le fil** — Tout le numéro en noir et blanc, sauf une seule image.

```text
semaine-01/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 02 — Béton neige

**01-07 au 01-13** · hiver · brutalisme, architecture · palette `#16233F` `#9AA3A8`

**La couverture** — Un bloc de béton brut où la neige s’est arrêtée net sur une arête.

**Le fil** — Lignes droites et matières dures, une seule douceur par chapitre.

```text
semaine-02/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 03 — La maison chaude

**01-14 au 01-20** · hiver · intérieur, lumière chaude · palette `#3A2A1E` `#E9B44C`

**La couverture** — L’intérieur d’une maison de nuit : une lampe allumée, un fauteuil vide.

**Le fil** — On reste dedans ; chaque chapitre éclaire une pièce différente.

```text
semaine-03/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 04 — Nordique

**01-21 au 01-27** · hiver · nordique, minimalisme · palette `#E8EAE6` `#6E7F8D`

**La couverture** — Un mur de bois clair, une lumière rasante sur la neige : presque rien.

**Le fil** — Le vide comme matière ; très peu d’objets, très bien placés.

```text
semaine-04/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 05 — Or et givre

**01-28 au 02-02** · hiver · luxe, matière précieuse · palette `#16233F` `#C9A227`

**La couverture** — De l’or sur du verre gelé : la matière précieuse tenue par le froid.

**Le fil** — Une seule pièce d’or par chapitre, toujours cadrée serré.

```text
semaine-05/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 06 — Plateau

**02-03 au 02-09** · hiver · cinéma, lumière de scène · palette `#0B0B0F` `#4C6E4C`

**La couverture** — Une scène vide éclairée comme un plateau, la fumée encore dans le faisceau.

**Le fil** — Chaque chapitre est un plan de cinéma, avec son éclairage signé.

```text
semaine-06/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 07 — Lanternes

**02-10 au 02-16** · hiver · culture, fêtes d’hiver · palette `#0d1526` `#E9B44C`

**La couverture** — Un lampion de papier seul suspendu dans la nuit, brûlant doucement.

**Le fil** — Les lumières du monde : une tradition par chapitre, jamais décorative.

```text
semaine-07/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 08 — Moquette

**02-17 au 02-23** · hiver · rétro, années 70 · palette `#6e342c` `#E9B44C`

**La couverture** — Un intérieur années 70 : moquette épaisse, lampe à abat-jour, cinéma du quotidien.

**Le fil** — Le grain des années 70 appliqué à tous les univers, sans nostalgie facile.

```text
semaine-08/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 09 — Les mains

**02-24 au 03-01** · hiver · documentaire, métiers d’art · palette `#4C6E4C` `#D8D2C6`

**La couverture** — Des mains et un outil, très près : le geste avant le visage.

**Le fil** — Un geste par chapitre : coudre, cuire, planter, jouer, écrire.

```text
semaine-09/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 10 — Blanc sur blanc

**03-02 au 03-08** · hiver · minimalisme · palette `#EDEDEA` `#C9C4BA`

**La couverture** — Coton, neige, ouate : du blanc sur du blanc, la lumière fait tout le dessin.

**Le fil** — Presque pas de couleur ; les chapitres se distinguent par la lumière.

```text
semaine-10/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 11 — Masque

**03-09 au 03-15** · hiver · art, carnaval vénitien · palette `#0B0B0F` `#B8574A`

**La couverture** — Plume, velours, un masque vénitien vu de très près : la matière avant la figure.

**Le fil** — L’art du travestissement : chaque chapitre change de peau.

```text
semaine-11/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 12 — La fonte

**03-16 au 03-22** · hiver · nature, fin d’hiver · palette `#16233F` `#7FB77E`

**La couverture** — L’eau qui coule sous la neige qui cède : le premier signe.

**Le fil** — Tout se remet à bouger ; le vert apparaît une fois par chapitre.

```text
semaine-12/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 13 — Jardin

**03-23 au 03-28** · printemps · nature, jardin anglais · palette `#7FB77E` `#4C6E4C`

**La couverture** — Un jardin trempé après la pluie, les feuilles lourdes, aucune fleur encore.

**Le fil** — Le vert comme base ; la fleur n’arrive qu’en fin de numéro.

```text
semaine-13/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 14 — Technicolor

**03-29 au 04-04** · printemps · pop, couleur · palette `#E9B44C` `#B8574A`

**La couverture** — Une couleur franche, pleine, presque trop : le printemps sans pudeur.

**Le fil** — Chaque chapitre a sa couleur, aucune ne domine les autres.

```text
semaine-14/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 15 — Méditerranée

**04-05 au 04-11** · printemps · voyage, méditerranéen · palette `#7FB77E` `#16233F`

**La couverture** — Une mer vide hors saison, un mur chaulé, une chaise pliante.

**Le fil** — Le Sud avant les gens : les lieux sans foule.

```text
semaine-15/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 16 — La robe

**04-12 au 04-18** · printemps · mode, éditorial · palette `#EDEDEA` `#B8574A`

**La couverture** — Une robe en mouvement, cadrée serré : le tissu seul fait le portrait.

**Le fil** — Le vêtement comme sujet ; un geste, jamais une pose.

```text
semaine-16/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 17 — Champagne

**04-19 au 04-24** · printemps · gastronomie, luxe · palette `#E9B44C` `#C9A227`

**La couverture** — Une flûte, la mousse qui monte, une lumière dorée de fin d’après-midi.

**Le fil** — Le service et les gestes : on coupe, on sert, on goûte.

```text
semaine-17/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 18 — Washi

**04-25 au 05-01** · printemps · japonais, culture · palette `#EDEDEA` `#B8574A`

**La couverture** — Du papier washi et l’ombre d’une branche : le Japon en deux matières.

**Le fil** — L’ombre portée comme motif, chapitre après chapitre.

```text
semaine-18/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 19 — Céramique

**05-02 au 05-08** · printemps · décoration, art de vivre · palette `#D8D2C6` `#4C6E4C`

**La couverture** — Trois céramiques blanches sur une nappe froissée, la lumière du matin.

**Le fil** — L’objet fait main : chaque chapitre montre une pièce d’atelier.

```text
semaine-19/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 20 — Trottoir

**05-09 au 05-15** · printemps · photographie de rue · palette `#16233F` `#E9B44C`

**La couverture** — Un trottoir après la pluie, des reflets, une vitrine qui s’allume.

**Le fil** — La ville hors du monument : rien qu’on puisse reconnaître.

```text
semaine-20/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 21 — Tirage

**05-16 au 05-21** · printemps · photographie argentique · palette `#6e342c` `#D8D2C6`

**La couverture** — Un tirage encore mouillé, suspendu par une pince, la lumière rouge du labo.

**Le fil** — Chaque chapitre cadré comme une photo tirée à la main.

```text
semaine-21/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 22 — Potager

**05-22 au 05-28** · printemps · gastronomie, nature · palette `#4C6E4C` `#E9B44C`

**La couverture** — Des légumes avec encore de la terre dessus, la lumière basse du matin.

**Le fil** — Ce qui pousse : la table part du jardin.

```text
semaine-22/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 23 — Henné

**05-29 au 06-04** · printemps · indien, culture · palette `#B8574A` `#E9B44C`

**La couverture** — Un textile brodé, un poignet orné au henné, la couleur avant tout.

**Le fil** — Le motif comme langage : une culture par chapitre, jamais folklorisée.

```text
semaine-23/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 24 — Piano

**06-05 au 06-11** · printemps · musique · palette `#0B0B0F` `#C9A227`

**La couverture** — Un piano de bar, la salle vide, une seule lampe.

**Le fil** — La musique comme décor : les instruments au repos.

```text
semaine-24/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 25 — La lettre

**06-12 au 06-17** · printemps · mémoire, papeterie · palette `#D8D2C6` `#6e342c`

**La couverture** — Une lettre pliée, un cachet de cire, une encre presque sèche.

**Le fil** — L’écrit : faire-part, livre d’or, menus calligraphiés.

```text
semaine-25/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 26 — Solstice

**06-18 au 06-24** · été · art du feu, culture · palette `#0d1526` `#E9B44C`

**La couverture** — Un feu allumé dans une nuit qui ne dure pas, des torches plantées.

**Le fil** — Le feu unique du numéro ; les chapitres s’éclairent à sa lumière.

```text
semaine-26/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 27 — Grand bleu

**06-25 au 07-01** · été · mer, nature · palette `#16233F` `#7FB77E`

**La couverture** — L’eau vue de très près, presque abstraite, le bleu qui vire au noir.

**Le fil** — L’eau sous toutes ses formes, une par chapitre.

```text
semaine-27/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 28 — Sable et sel

**07-02 au 07-08** · été · minimalisme, matière · palette `#D8D2C6` `#9AA3A8`

**La couverture** — Du sable mouillé et des cristaux de sel : deux matières, une lumière dure.

**Le fil** — Presque rien dans le cadre ; la matière fait l’image.

```text
semaine-28/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 29 — Cuivres

**07-09 au 07-15** · été · musique, fête · palette `#E9B44C` `#6e342c`

**La couverture** — Des tambours et des cuivres posés au sol, prêts, personne autour.

**Le fil** — La fête vue par ses instruments et ses lumières.

```text
semaine-29/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 30 — Toscane

**07-16 au 07-21** · été · voyage, italien, gastronomie · palette `#7FB77E` `#E9B44C`

**La couverture** — Des cyprès et une longue table sous les arbres, la lumière de fin d’après-midi.

**Le fil** — Le repas dehors, du potager jusqu’à la table.

```text
semaine-30/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 31 — Piscine

**07-22 au 07-28** · été · luxe, surréalisme · palette `#16233F` `#EDEDEA`

**La couverture** — Une chaise au bord de l’eau, une ombre impossible, le carrelage bleu : un été presque irréel.

**Le fil** — Un détail surréel par chapitre, jamais gratuit.

```text
semaine-31/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 32 — Néons

**07-29 au 08-04** · été · pop, fête foraine · palette `#B8574A` `#E9B44C`

**La couverture** — Un manège éteint, un néon encore allumé, la nuit qui descend.

**Le fil** — Les lumières de la fête foraine appliquées à tout.

```text
semaine-32/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 33 — Couleur

**08-05 au 08-11** · été · latin, danse · palette `#E9B44C` `#B8574A`

**La couverture** — Une robe de danse en mouvement, le tissu en vol, aucun visage.

**Le fil** — Le mouvement : chaque chapitre pris en pleine action.

```text
semaine-33/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 34 — Pieds nus

**08-12 au 08-17** · été · documentaire, plage · palette `#D8D2C6` `#16233F`

**La couverture** — Des pieds nus dans le sable, un ourlet qui traîne : le mariage sans le montrer.

**Le fil** — Le documentaire pur : rien qui pose.

```text
semaine-34/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 35 — Fumée

**08-18 au 08-24** · été · gastronomie, feu · palette `#6e342c` `#E9B44C`

**La couverture** — La fumée d’un feu de bois qui monte sur une grille, la lumière du soir.

**Le fil** — Le feu et la fumée : cuire, réunir.

```text
semaine-35/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 36 — Wax

**08-25 au 08-31** · été · africain, mode, culture · palette `#E9B44C` `#4C6E4C`

**La couverture** — Un wax aux motifs éclatants, porté, la lumière dure du plein midi.

**Le fil** — Le textile comme culture : un motif différent par chapitre.

```text
semaine-36/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 37 — Nuit blanche

**09-01 au 09-07** · été · fête, DJ, scène · palette `#0B0B0F` `#B8574A`

**La couverture** — Une console et de la fumée colorée, la nuit qui ne s’arrête pas.

**Le fil** — Le son et la lumière : le chapitre fête donne le tempo.

```text
semaine-37/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 38 — Route

**09-08 au 09-13** · été · américain, voyage · palette `#E9B44C` `#16233F`

**La couverture** — Une route droite, un motel au néon, la lumière rasante du soir.

**Le fil** — Le road trip : chaque chapitre est une étape.

```text
semaine-38/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 39 — Blé coupé

**09-14 au 09-20** · été · nature, fin d’été · palette `#E9B44C` `#D8D2C6`

**La couverture** — Un champ coupé, les ballots, une ombre très longue : la fin de saison.

**Le fil** — La mélancolie heureuse de la fin d’été.

```text
semaine-39/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 40 — Brume

**09-21 au 09-27** · automne · nature, forêt · palette `#6E7F8D` `#4C6E4C`

**La couverture** — Des troncs dans la brume, la lumière qui traverse en nappes.

**Le fil** — Le brouillard comme liant : tout est voilé, rien n’est caché.

```text
semaine-40/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 41 — Escalier

**09-28 au 10-04** · automne · architecture, patrimoine · palette `#9AA3A8` `#16233F`

**La couverture** — Un escalier de pierre usé, la lumière qui monte marche par marche.

**Le fil** — La pierre et l’ombre : le patrimoine sans carte postale.

```text
semaine-41/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 42 — Vendange

**10-05 au 10-10** · automne · gastronomie, terre · palette `#6e342c` `#4C6E4C`

**La couverture** — Des grappes et des mains tachées, une cuve en arrière-plan.

**Le fil** — La terre et la main : ce que l’automne donne.

```text
semaine-42/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 43 — Projecteur

**10-11 au 10-17** · automne · cinéma · palette `#0B0B0F` `#E9B44C`

**La couverture** — Un projecteur allumé, le faisceau coupé par la poussière, la salle vide.

**Le fil** — La lumière comme personnage principal du numéro.

```text
semaine-43/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 44 — Tartan

**10-18 au 10-24** · automne · mode, écossais · palette `#4C6E4C` `#6e342c`

**La couverture** — De la laine tartan mouillée de brouillard, cadrée serré, une épingle d’argent.

**Le fil** — La maille et le drap : l’automne habillé.

```text
semaine-44/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 45 — Champignons

**10-25 au 10-31** · automne · art de recevoir · palette `#4C6E4C` `#6e342c`

**La couverture** — Des champignons et une céramique sombre, la lumière basse de fin de journée.

**Le fil** — La table d’automne : ce qu’on ramasse et ce qu’on sert.

```text
semaine-45/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 46 — Brumes du fleuve

**11-01 au 11-06** · automne · italien, voyage · palette `#9AA3A8` `#E9B44C`

**La couverture** — Un fleuve dans la brume, des peupliers, une barque sans personne.

**Le fil** — L’Italie du nord, humide et lente.

```text
semaine-46/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 47 — Atelier

**11-07 au 11-13** · automne · art · palette `#D8D2C6` `#B8574A`

**La couverture** — Des pinceaux, du papier, une encre renversée : le travail en cours.

**Le fil** — L’art en train de se faire, chapitre par chapitre.

```text
semaine-47/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 48 — Trois âges

**11-14 au 11-20** · automne · documentaire, famille · palette `#6e342c` `#D8D2C6`

**La couverture** — Des mains de trois âges sur une même nappe, rien d’autre dans le cadre.

**Le fil** — La transmission : ce qui passe d’une main à l’autre.

```text
semaine-48/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 49 — Vinyle

**11-21 au 11-27** · automne · musique, rétro · palette `#6e342c` `#E9B44C`

**La couverture** — Une platine, un vinyle qui tourne, la lumière chaude d’une lampe.

**Le fil** — L’analogique : le son qu’on voit.

```text
semaine-49/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 50 — Salle des mariages

**11-28 au 12-03** · automne · documentaire, lieu · palette `#9AA3A8` `#B8574A`

**La couverture** — Une salle de mairie vide : les chaises, l’estrade, la lumière du matin.

**Le fil** — Le lieu du oui, sans personne dedans.

```text
semaine-50/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 51 — Avent

**12-04 au 12-10** · automne · fin d’année, lumière · palette `#0d1526` `#E9B44C`

**La couverture** — Des bougies posées dans des verres sur une table sombre, la nuit dehors.

**Le fil** — On compte les jours : la lumière revient.

```text
semaine-51/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 52 — Noir

**12-11 au 12-17** · automne · noir et blanc, minimalisme · palette `#0B0B0F` `#EDEDEA`

**La couverture** — Une seule source, un fond noir, une matière qui émerge du noir.

**Le fil** — Le numéro le plus sombre de l’année, tout en contraste.

```text
semaine-52/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 53 — Rubans

**12-18 au 12-24** · hiver · luxe, Noël contemporain · palette `#6e342c` `#C9A227`

**La couverture** — Du papier et des rubans, un nœud serré, la lumière chaude d’un intérieur.

**Le fil** — L’emballage et l’attente : ce qu’on prépare pour les autres.

```text
semaine-53/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

### Semaine 54 — Minuit

**12-25 au 12-31** · hiver · fête, réveillon · palette `#0B0B0F` `#E9B44C`

**La couverture** — Une table dressée pour minuit, les verres levés mais hors champ, des paillettes.

**Le fil** — La dernière nuit : on referme l’année en fête.

```text
semaine-54/
  cover.jpg                 ← la couverture — la porte d’entrée
  01-amoureux.jpg           ← Les amoureux : Couple, rencontre, engagement, famille, émotions, relation humaine
  02-style.jpg              ← Le style : Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode
  03-lieux.jpg              ← Les lieux : Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations
  04-recevoir.jpg           ← L’art de recevoir : Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table
  05-fete.jpg               ← La fête : Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit
  06-monde.jpg              ← Le monde : Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux
  07-souvenirs.jpg          ← Les souvenirs : Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire
```

---

## 5. La correspondance DATE → SEMAINE → CHAPITRE

Un exemple pris sur les journées déjà documentées par le magazine :

| date | semaine | magazine |
| --- | --- | --- |
| 02-14 | semaine 07 | Lanternes |
| 03-17 | semaine 12 | La fonte |
| 05-16 | semaine 21 | Tirage |
| 06-24 | semaine 26 | Solstice |
| 07-12 | semaine 29 | Cuivres |
| 12-25 | semaine 54 | Minuit |

Le chapitre, lui, est celui du jour de la semaine — le site le décide. La
bibliothèque fournit les sept images ; la navigation les parcourt.

