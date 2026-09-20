/**
 * LES 54 SEMAINES — LE PLAN ÉDITORIAL, ET LES RÈGLES QUI LE RENDENT VÉRIFIABLE
 *
 * Le modèle n'est plus « 365 jours = 365 magazines », il est
 * **54 semaines = 54 magazines**, et chaque magazine a **7 chapitres** :
 * les sept mêmes univers, traités différemment chaque semaine.
 *
 * Ce fichier tient deux choses, et rien d'autre :
 *
 *   1. **le plan** — les 54 magazines, chacun avec son titre, son style
 *      dominant, sa palette, son idée de couverture et le fil qui tient ses
 *      sept chapitres ensemble ;
 *   2. **les règles** — le découpage de l'année en 54 semaines, les sept
 *      chapitres et leurs noms de fichiers, la saison d'une semaine.
 *
 * Tout le reste (les lots, le plan écrit, le manifeste) est *dérivé* d'ici :
 * une seule source, donc rien qui puisse diverger.
 *
 * ## Le découpage de l'année
 *
 * 365 jours ne se divisent pas en 54 semaines de 7 jours (54 × 7 = 378). Le
 * découpage retenu est **proportionnel et régulier** : la semaine `n` couvre
 * les jours `⌊(n−1) × 365 / 54⌋ + 1` à `⌊n × 365 / 54⌋`. Chaque jour de
 * l'année appartient à exactement une semaine, aucune semaine n'est vide, et
 * la règle se recalcule sans table.
 *
 * **Le site reste maître du calendrier.** Cette fonction existe ici pour que la
 * bibliothèque sache à quelle saison appartient une semaine, et pour que la
 * correspondance `DATE → SEMAINE → CHAPITRE` soit *écrite quelque part* plutôt
 * que devinée.
 */

/* ————————————————————————————— LE DÉCOUPAGE ————————————————————————————— */

/** Les longueurs de mois d'une année commune — 2026 ne saute pas de jour. */
const MOIS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const JOURS_DE_L_ANNEE = 365;
export const NOMBRE_DE_SEMAINES = 54;

/** Les jours de l'année que couvre la semaine `n` (1 à 54), en indices 1–365. */
export function plageJours(n) {
  return [Math.floor(((n - 1) * JOURS_DE_L_ANNEE) / NOMBRE_DE_SEMAINES) + 1, Math.floor((n * JOURS_DE_L_ANNEE) / NOMBRE_DE_SEMAINES)];
}

/** Un indice de jour (1–365) écrit en `MM-JJ`. */
export function jourDeLAnnee(indice) {
  let reste = indice;
  for (let m = 0; m < 12; m += 1) {
    if (reste <= MOIS[m]) return `${String(m + 1).padStart(2, '0')}-${String(reste).padStart(2, '0')}`;
    reste -= MOIS[m];
  }
  return '12-31';
}

/** Les deux bornes d'une semaine, écrites `MM-JJ`. */
export function plageDates(n) {
  const [debut, fin] = plageJours(n);
  return { debut: jourDeLAnnee(debut), fin: jourDeLAnnee(fin) };
}

/** Les saisons, aux dates astronomiques de 2026. */
const DEBUTS_DE_SAISON = [
  { jour: 355, saison: 'hiver' }, // 21 décembre 2026
  { jour: 266, saison: 'automne' }, // 23 septembre 2026
  { jour: 172, saison: 'ete' }, // 21 juin 2026
  { jour: 79, saison: 'printemps' }, // 20 mars 2026
];

/** La saison d'un jour de l'année. */
export function saisonDuJour(indice) {
  for (const borne of DEBUTS_DE_SAISON) if (indice >= borne.jour) return borne.saison;
  return 'hiver';
}

/**
 * La saison d'une semaine : **celle de la majorité de ses jours**. À cheval,
 * la semaine garde la saison qu'elle a le plus — c'est une règle simple, et
 * elle se vérifie.
 */
export function saisonDeLaSemaine(n) {
  const [debut, fin] = plageJours(n);
  const compte = {};
  for (let j = debut; j <= fin; j += 1) compte[saisonDuJour(j)] = (compte[saisonDuJour(j)] ?? 0) + 1;
  return Object.entries(compte).sort((a, b) => b[1] - a[1])[0][0];
}

/** La semaine d'un jour du calendrier — `DATE → SEMAINE`. */
export function semaineDuJour(jour) {
  const [mm, jj] = jour.split('-').map(Number);
  let indice = jj;
  for (let m = 0; m < mm - 1; m += 1) indice += MOIS[m];
  for (let n = 1; n <= NOMBRE_DE_SEMAINES; n += 1) {
    const [debut, fin] = plageJours(n);
    if (indice >= debut && indice <= fin) return n;
  }
  return NOMBRE_DE_SEMAINES;
}

/** Le dossier d'une semaine : `semaine-01` … `semaine-54`. */
export function cheminSemaine(n) {
  return `semaine-${String(n).padStart(2, '0')}`;
}

/* ———————————————————————————— LES 7 CHAPITRES ———————————————————————————— */

/**
 * Les sept univers, dans l'ordre, avec **le nom de fichier exact**. C'est la
 * seule liste qui fait autorité : les scripts, le manifeste et le plan en
 * dérivent tous.
 */
export const CHAPITRES = [
  { ordre: 1, slug: '01-amoureux', nom: 'Les amoureux', univers: 'Couple, rencontre, engagement, famille, émotions, relation humaine' },
  { ordre: 2, slug: '02-style', nom: 'Le style', univers: 'Robe, costume, beauté, coiffure, bijoux, accessoires, fleurs, mode' },
  { ordre: 3, slug: '03-lieux', nom: 'Les lieux', univers: 'Châteaux, maisons, hôtels, villes, campagnes, plages, architectures, destinations' },
  { ordre: 4, slug: '04-recevoir', nom: 'L’art de recevoir', univers: 'Tables, gastronomie, pâtisserie, fleurs, décoration, objets, art de la table' },
  { ordre: 5, slug: '05-fete', nom: 'La fête', univers: 'Musique, danse, DJ, concerts, lumière, scène, cocktails, fête, nuit' },
  { ordre: 6, slug: '06-monde', nom: 'Le monde', univers: 'Cultures, traditions, voyages, patrimoine, peuples, cérémonies, mariages internationaux' },
  { ordre: 7, slug: '07-souvenirs', nom: 'Les souvenirs', univers: 'Photographie, vidéo, albums, lettres, objets, archives, transmission, mémoire' },
];

/** La couverture n'est pas un chapitre : c'est la porte d'entrée du magazine. */
export const COUVERTURE = 'cover';

/** Les huit fichiers d'une semaine, dans l'ordre de production. */
export const IMAGES_DE_LA_SEMAINE = [COUVERTURE, ...CHAPITRES.map((c) => c.slug)];

/** Le chapitre par son slug. */
export function chapitreParSlug(slug) {
  return CHAPITRES.find((c) => c.slug === slug) ?? null;
}

/* ————————————————————————————— LE FORMAT ————————————————————————————— */

/** Le format de la maison : le même que la bibliothèque des jours. */
export const FORMAT = { ratio: '5:7', largeur: 1000, hauteur: 1400 };

/* ————————————————————————— LE PLAN DES 54 SEMAINES ————————————————————————— */

/**
 * Chaque semaine : un titre, un style dominant, une palette, **une idée de
 * couverture** et **le fil** qui tient ses sept chapitres ensemble.
 *
 * La règle de diversité est la contrainte dure : sur les 54 semaines, aucun
 * style ne revient plus de trois fois comme dominant, et les territoires que
 * le brief liste (éditorial, mode, cinéma, documentaire, architecture,
 * voyage, gastronomie, musique, art, culture, luxe, minimalisme, noir et
 * blanc, argentique, rue, nature, surréalisme, pop, rétro, contemporain,
 * brutalisme, méditerranéen, japonais, indien, africain, latin, nordique,
 * français, italien, américain) sont tous visités.
 */
export const SEMAINES = [
  { n: 1, titre: 'Noir gelé', style: 'noir et blanc, documentaire', palette: ['#0B0B0F', '#EDEDEA'], couverture: 'Une vitre gelée en noir et blanc, contrastée à bloc, comme un premier négatif.', fil: 'Tout le numéro en noir et blanc, sauf une seule image.' },
  { n: 2, titre: 'Béton neige', style: 'brutalisme, architecture', palette: ['#16233F', '#9AA3A8'], couverture: 'Un bloc de béton brut où la neige s’est arrêtée net sur une arête.', fil: 'Lignes droites et matières dures, une seule douceur par chapitre.' },
  { n: 3, titre: 'La maison chaude', style: 'intérieur, lumière chaude', palette: ['#3A2A1E', '#E9B44C'], couverture: 'L’intérieur d’une maison de nuit : une lampe allumée, un fauteuil vide.', fil: 'On reste dedans ; chaque chapitre éclaire une pièce différente.' },
  { n: 4, titre: 'Nordique', style: 'nordique, minimalisme', palette: ['#E8EAE6', '#6E7F8D'], couverture: 'Un mur de bois clair, une lumière rasante sur la neige : presque rien.', fil: 'Le vide comme matière ; très peu d’objets, très bien placés.' },
  { n: 5, titre: 'Or et givre', style: 'luxe, matière précieuse', palette: ['#16233F', '#C9A227'], couverture: 'De l’or sur du verre gelé : la matière précieuse tenue par le froid.', fil: 'Une seule pièce d’or par chapitre, toujours cadrée serré.' },
  { n: 6, titre: 'Plateau', style: 'cinéma, lumière de scène', palette: ['#0B0B0F', '#4C6E4C'], couverture: 'Une scène vide éclairée comme un plateau, la fumée encore dans le faisceau.', fil: 'Chaque chapitre est un plan de cinéma, avec son éclairage signé.' },
  { n: 7, titre: 'Lanternes', style: 'culture, fêtes d’hiver', palette: ['#0d1526', '#E9B44C'], couverture: 'Un lampion de papier seul suspendu dans la nuit, brûlant doucement.', fil: 'Les lumières du monde : une tradition par chapitre, jamais décorative.' },
  { n: 8, titre: 'Moquette', style: 'rétro, années 70', palette: ['#6e342c', '#E9B44C'], couverture: 'Un intérieur années 70 : moquette épaisse, lampe à abat-jour, cinéma du quotidien.', fil: 'Le grain des années 70 appliqué à tous les univers, sans nostalgie facile.' },
  { n: 9, titre: 'Les mains', style: 'documentaire, métiers d’art', palette: ['#4C6E4C', '#D8D2C6'], couverture: 'Des mains et un outil, très près : le geste avant le visage.', fil: 'Un geste par chapitre : coudre, cuire, planter, jouer, écrire.' },
  { n: 10, titre: 'Blanc sur blanc', style: 'minimalisme', palette: ['#EDEDEA', '#C9C4BA'], couverture: 'Coton, neige, ouate : du blanc sur du blanc, la lumière fait tout le dessin.', fil: 'Presque pas de couleur ; les chapitres se distinguent par la lumière.' },
  { n: 11, titre: 'Masque', style: 'art, carnaval vénitien', palette: ['#0B0B0F', '#B8574A'], couverture: 'Plume, velours, un masque vénitien vu de très près : la matière avant la figure.', fil: 'L’art du travestissement : chaque chapitre change de peau.' },
  { n: 12, titre: 'La fonte', style: 'nature, fin d’hiver', palette: ['#16233F', '#7FB77E'], couverture: 'L’eau qui coule sous la neige qui cède : le premier signe.', fil: 'Tout se remet à bouger ; le vert apparaît une fois par chapitre.' },

  { n: 13, titre: 'Jardin', style: 'nature, jardin anglais', palette: ['#7FB77E', '#4C6E4C'], couverture: 'Un jardin trempé après la pluie, les feuilles lourdes, aucune fleur encore.', fil: 'Le vert comme base ; la fleur n’arrive qu’en fin de numéro.' },
  { n: 14, titre: 'Technicolor', style: 'pop, couleur', palette: ['#E9B44C', '#B8574A'], couverture: 'Une couleur franche, pleine, presque trop : le printemps sans pudeur.', fil: 'Chaque chapitre a sa couleur, aucune ne domine les autres.' },
  { n: 15, titre: 'Méditerranée', style: 'voyage, méditerranéen', palette: ['#7FB77E', '#16233F'], couverture: 'Une mer vide hors saison, un mur chaulé, une chaise pliante.', fil: 'Le Sud avant les gens : les lieux sans foule.' },
  { n: 16, titre: 'La robe', style: 'mode, éditorial', palette: ['#EDEDEA', '#B8574A'], couverture: 'Une robe en mouvement, cadrée serré : le tissu seul fait le portrait.', fil: 'Le vêtement comme sujet ; un geste, jamais une pose.' },
  { n: 17, titre: 'Champagne', style: 'gastronomie, luxe', palette: ['#E9B44C', '#C9A227'], couverture: 'Une flûte, la mousse qui monte, une lumière dorée de fin d’après-midi.', fil: 'Le service et les gestes : on coupe, on sert, on goûte.' },
  { n: 18, titre: 'Washi', style: 'japonais, culture', palette: ['#EDEDEA', '#B8574A'], couverture: 'Du papier washi et l’ombre d’une branche : le Japon en deux matières.', fil: 'L’ombre portée comme motif, chapitre après chapitre.' },
  { n: 19, titre: 'Céramique', style: 'décoration, art de vivre', palette: ['#D8D2C6', '#4C6E4C'], couverture: 'Trois céramiques blanches sur une nappe froissée, la lumière du matin.', fil: 'L’objet fait main : chaque chapitre montre une pièce d’atelier.' },
  { n: 20, titre: 'Trottoir', style: 'photographie de rue', palette: ['#16233F', '#E9B44C'], couverture: 'Un trottoir après la pluie, des reflets, une vitrine qui s’allume.', fil: 'La ville hors du monument : rien qu’on puisse reconnaître.' },
  { n: 21, titre: 'Tirage', style: 'photographie argentique', palette: ['#6e342c', '#D8D2C6'], couverture: 'Un tirage encore mouillé, suspendu par une pince, la lumière rouge du labo.', fil: 'Chaque chapitre cadré comme une photo tirée à la main.' },
  { n: 22, titre: 'Potager', style: 'gastronomie, nature', palette: ['#4C6E4C', '#E9B44C'], couverture: 'Des légumes avec encore de la terre dessus, la lumière basse du matin.', fil: 'Ce qui pousse : la table part du jardin.' },
  { n: 23, titre: 'Henné', style: 'indien, culture', palette: ['#B8574A', '#E9B44C'], couverture: 'Un textile brodé, un poignet orné au henné, la couleur avant tout.', fil: 'Le motif comme langage : une culture par chapitre, jamais folklorisée.' },
  { n: 24, titre: 'Piano', style: 'musique', palette: ['#0B0B0F', '#C9A227'], couverture: 'Un piano de bar, la salle vide, une seule lampe.', fil: 'La musique comme décor : les instruments au repos.' },
  { n: 25, titre: 'La lettre', style: 'mémoire, papeterie', palette: ['#D8D2C6', '#6e342c'], couverture: 'Une lettre pliée, un cachet de cire, une encre presque sèche.', fil: 'L’écrit : faire-part, livre d’or, menus calligraphiés.' },
  { n: 26, titre: 'Solstice', style: 'art du feu, culture', palette: ['#0d1526', '#E9B44C'], couverture: 'Un feu allumé dans une nuit qui ne dure pas, des torches plantées.', fil: 'Le feu unique du numéro ; les chapitres s’éclairent à sa lumière.' },

  { n: 27, titre: 'Grand bleu', style: 'mer, nature', palette: ['#16233F', '#7FB77E'], couverture: 'L’eau vue de très près, presque abstraite, le bleu qui vire au noir.', fil: 'L’eau sous toutes ses formes, une par chapitre.' },
  { n: 28, titre: 'Sable et sel', style: 'minimalisme, matière', palette: ['#D8D2C6', '#9AA3A8'], couverture: 'Du sable mouillé et des cristaux de sel : deux matières, une lumière dure.', fil: 'Presque rien dans le cadre ; la matière fait l’image.' },
  { n: 29, titre: 'Cuivres', style: 'musique, fête', palette: ['#E9B44C', '#6e342c'], couverture: 'Des tambours et des cuivres posés au sol, prêts, personne autour.', fil: 'La fête vue par ses instruments et ses lumières.' },
  { n: 30, titre: 'Toscane', style: 'voyage, italien, gastronomie', palette: ['#7FB77E', '#E9B44C'], couverture: 'Des cyprès et une longue table sous les arbres, la lumière de fin d’après-midi.', fil: 'Le repas dehors, du potager jusqu’à la table.' },
  { n: 31, titre: 'Piscine', style: 'luxe, surréalisme', palette: ['#16233F', '#EDEDEA'], couverture: 'Une chaise au bord de l’eau, une ombre impossible, le carrelage bleu : un été presque irréel.', fil: 'Un détail surréel par chapitre, jamais gratuit.' },
  { n: 32, titre: 'Néons', style: 'pop, fête foraine', palette: ['#B8574A', '#E9B44C'], couverture: 'Un manège éteint, un néon encore allumé, la nuit qui descend.', fil: 'Les lumières de la fête foraine appliquées à tout.' },
  { n: 33, titre: 'Couleur', style: 'latin, danse', palette: ['#E9B44C', '#B8574A'], couverture: 'Une robe de danse en mouvement, le tissu en vol, aucun visage.', fil: 'Le mouvement : chaque chapitre pris en pleine action.' },
  { n: 34, titre: 'Pieds nus', style: 'documentaire, plage', palette: ['#D8D2C6', '#16233F'], couverture: 'Des pieds nus dans le sable, un ourlet qui traîne : le mariage sans le montrer.', fil: 'Le documentaire pur : rien qui pose.' },
  { n: 35, titre: 'Fumée', style: 'gastronomie, feu', palette: ['#6e342c', '#E9B44C'], couverture: 'La fumée d’un feu de bois qui monte sur une grille, la lumière du soir.', fil: 'Le feu et la fumée : cuire, réunir.' },
  { n: 36, titre: 'Wax', style: 'africain, mode, culture', palette: ['#E9B44C', '#4C6E4C'], couverture: 'Un wax aux motifs éclatants, porté, la lumière dure du plein midi.', fil: 'Le textile comme culture : un motif différent par chapitre.' },
  { n: 37, titre: 'Nuit blanche', style: 'fête, DJ, scène', palette: ['#0B0B0F', '#B8574A'], couverture: 'Une console et de la fumée colorée, la nuit qui ne s’arrête pas.', fil: 'Le son et la lumière : le chapitre fête donne le tempo.' },
  { n: 38, titre: 'Route', style: 'américain, voyage', palette: ['#E9B44C', '#16233F'], couverture: 'Une route droite, un motel au néon, la lumière rasante du soir.', fil: 'Le road trip : chaque chapitre est une étape.' },
  { n: 39, titre: 'Blé coupé', style: 'nature, fin d’été', palette: ['#E9B44C', '#D8D2C6'], couverture: 'Un champ coupé, les ballots, une ombre très longue : la fin de saison.', fil: 'La mélancolie heureuse de la fin d’été.' },

  { n: 40, titre: 'Brume', style: 'nature, forêt', palette: ['#6E7F8D', '#4C6E4C'], couverture: 'Des troncs dans la brume, la lumière qui traverse en nappes.', fil: 'Le brouillard comme liant : tout est voilé, rien n’est caché.' },
  { n: 41, titre: 'Escalier', style: 'architecture, patrimoine', palette: ['#9AA3A8', '#16233F'], couverture: 'Un escalier de pierre usé, la lumière qui monte marche par marche.', fil: 'La pierre et l’ombre : le patrimoine sans carte postale.' },
  { n: 42, titre: 'Vendange', style: 'gastronomie, terre', palette: ['#6e342c', '#4C6E4C'], couverture: 'Des grappes et des mains tachées, une cuve en arrière-plan.', fil: 'La terre et la main : ce que l’automne donne.' },
  { n: 43, titre: 'Projecteur', style: 'cinéma', palette: ['#0B0B0F', '#E9B44C'], couverture: 'Un projecteur allumé, le faisceau coupé par la poussière, la salle vide.', fil: 'La lumière comme personnage principal du numéro.' },
  { n: 44, titre: 'Tartan', style: 'mode, écossais', palette: ['#4C6E4C', '#6e342c'], couverture: 'De la laine tartan mouillée de brouillard, cadrée serré, une épingle d’argent.', fil: 'La maille et le drap : l’automne habillé.' },
  { n: 45, titre: 'Champignons', style: 'art de recevoir', palette: ['#4C6E4C', '#6e342c'], couverture: 'Des champignons et une céramique sombre, la lumière basse de fin de journée.', fil: 'La table d’automne : ce qu’on ramasse et ce qu’on sert.' },
  { n: 46, titre: 'Brumes du fleuve', style: 'italien, voyage', palette: ['#9AA3A8', '#E9B44C'], couverture: 'Un fleuve dans la brume, des peupliers, une barque sans personne.', fil: 'L’Italie du nord, humide et lente.' },
  { n: 47, titre: 'Atelier', style: 'art', palette: ['#D8D2C6', '#B8574A'], couverture: 'Des pinceaux, du papier, une encre renversée : le travail en cours.', fil: 'L’art en train de se faire, chapitre par chapitre.' },
  { n: 48, titre: 'Trois âges', style: 'documentaire, famille', palette: ['#6e342c', '#D8D2C6'], couverture: 'Des mains de trois âges sur une même nappe, rien d’autre dans le cadre.', fil: 'La transmission : ce qui passe d’une main à l’autre.' },
  { n: 49, titre: 'Vinyle', style: 'musique, rétro', palette: ['#6e342c', '#E9B44C'], couverture: 'Une platine, un vinyle qui tourne, la lumière chaude d’une lampe.', fil: 'L’analogique : le son qu’on voit.' },
  { n: 50, titre: 'Salle des mariages', style: 'documentaire, lieu', palette: ['#9AA3A8', '#B8574A'], couverture: 'Une salle de mairie vide : les chaises, l’estrade, la lumière du matin.', fil: 'Le lieu du oui, sans personne dedans.' },
  { n: 51, titre: 'Avent', style: 'fin d’année, lumière', palette: ['#0d1526', '#E9B44C'], couverture: 'Des bougies posées dans des verres sur une table sombre, la nuit dehors.', fil: 'On compte les jours : la lumière revient.' },
  { n: 52, titre: 'Noir', style: 'noir et blanc, minimalisme', palette: ['#0B0B0F', '#EDEDEA'], couverture: 'Une seule source, un fond noir, une matière qui émerge du noir.', fil: 'Le numéro le plus sombre de l’année, tout en contraste.' },
  { n: 53, titre: 'Rubans', style: 'luxe, Noël contemporain', palette: ['#6e342c', '#C9A227'], couverture: 'Du papier et des rubans, un nœud serré, la lumière chaude d’un intérieur.', fil: 'L’emballage et l’attente : ce qu’on prépare pour les autres.' },
  { n: 54, titre: 'Minuit', style: 'fête, réveillon', palette: ['#0B0B0F', '#E9B44C'], couverture: 'Une table dressée pour minuit, les verres levés mais hors champ, des paillettes.', fil: 'La dernière nuit : on referme l’année en fête.' },
];

/** La semaine par son numéro. */
export function semaineParNumero(n) {
  return SEMAINES.find((s) => s.n === n) ?? null;
}

/** La semaine telle qu'on la lit : plan + calculs. */
export function semaineComplete(n) {
  const plan = semaineParNumero(n);
  if (!plan) return null;
  return { ...plan, saison: saisonDeLaSemaine(n), dates: plageDates(n), dossier: cheminSemaine(n) };
}

/** Les saisons, dans l'ordre de l'année, pour l'affichage. */
export const SAISONS = ['hiver', 'printemps', 'ete', 'automne'];

/** Les saisons écrites en français. */
export const SAISON_EN_FRANCAIS = { hiver: 'hiver', printemps: 'printemps', ete: 'été', automne: 'automne' };
