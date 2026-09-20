/**
 * LE MOTEUR DES 54 NUMÉROS — MODULE DU SITE, EN STUB ICI.
 *
 * La version complète de ce moteur vit dans le dépôt du site : elle compose
 * l'édition d'un numéro (les 24 pages, les 54 numéros, les rôles, les
 * univers) et dépend de données du site (`weddingStyles`, `personas`,
 * `weddingPlaylist`, `superFooter`) qui n'appartiennent pas à cette
 * bibliothèque.
 *
 * **Aucun document de cette bibliothèque n'utilise ce moteur.** Seul
 * `jourDuMagazine.ts` l'importe — et seulement pour `editionDuJour`, que les
 * documents engendrés n'appellent jamais. Ce stub existe pour que la copie de
 * `jourDuMagazine.ts` reste mot pour mot identique à celle du site.
 *
 * S'il est appelé, il dit son nom — rien n'est inventé à sa place.
 */

/** Rubriques de l'édition : les 8, toujours dans le même ordre. */
export type NomDeRubrique = string;

export interface PageEdition {
  rubrique: NomDeRubrique;
  /** L'heure de la journée : 0 à 23. Une page par heure. */
  heure: number;
  /** Comment cette heure s'appelle, et quelle lumière elle porte. */
  nomDeLHeure: string;
  lumiere: string;
  titre: string;
  texte: string;
  /** Une signature courte : ce qui a décidé cette page. */
  source: string;
}

export interface OptionsEdition {
  /** La semaine voulue. Par défaut : celle d'aujourd'hui. */
  numero?: number;
  /** L'année de lecture. */
  annee?: number;
  /** Le rôle de la personne (son personnage). */
  roleId?: string;
  /** L'univers choisi. */
  styleId?: string;
  /** Les coches de SUPER RIPPLE. */
  options?: string[];
  /** Passé, présent, futur : la même semaine, trois fois. */
  temps?: 'passe' | 'present' | 'futur';
}

export interface Edition {
  /** Le numéro : 1 à 54. */
  numero: number;
  carte: { numero: number; figure: string };
  saison: { nom: string; symbole: string; fond: string };
  /** Les dates couvertes. */
  du: Date;
  fin: Date;
  /** Le titre de l'édition, sur la couverture. */
  titre: string;
  sousTitre: string;
  temps: 'passe' | 'present' | 'futur';
  pages: PageEdition[];
}

export function composerEdition(_options: OptionsEdition = {}): Edition {
  throw new Error(
    "Le moteur des 54 numéros est un module du site — cette bibliothèque ne le compose pas. La version complète est dans le dépôt du site.",
  );
}
