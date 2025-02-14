import {
  IAffiliationReport,
  ICharacter,
  IPlanetReportResponse,
  IPlanetResponse,
} from '../interfaces/planet-adapter.interface';

export class PlanetAdapter {
  static toPlanetReportResponse(
    planet: IPlanetResponse,
  ): IPlanetReportResponse {
    const affiliationMap: Map<string, ICharacter[]> = new Map();

    planet.characters.forEach((character) => {
      const affiliation = character.affiliation || 'Unknown';

      if (!affiliationMap.has(affiliation)) {
        affiliationMap.set(affiliation, []);
      }
      affiliationMap.get(affiliation)!.push(character);
    });

    const affiliationReport: IAffiliationReport[] = Array.from(
      affiliationMap,
      ([affiliation, characters]) => ({
        affiliation,
        characters,
      }),
    );

    return {
      id: planet.id,
      name: planet.name,
      affiliationReport,
    };
  }
}
