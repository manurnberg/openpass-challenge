export interface ICharacter {
  affiliation: string;
  id: number;
  name: string;
  ki: string;
  race: string;
  image: string;
}

export interface IAffiliationReport {
  affiliation: string;
  characters: ICharacter[];
}

export interface IPlanetResponse {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt?: string | null;
  characters: ICharacter[];
}

export interface IPlanetReportResponse {
  id: number;
  name: string;
  affiliationReport: IAffiliationReport[];
}
