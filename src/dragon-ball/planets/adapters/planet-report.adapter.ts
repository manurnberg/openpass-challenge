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
    const affiliationMap = new Map<string, ICharacter[]>();

    planet.characters.forEach((character: ICharacter) => {
      const { ...cleanCharacterData } = character;

      const affiliation = character.affiliation || 'Unknown';

      if (!affiliationMap.has(affiliation)) {
        affiliationMap.set(affiliation, []);
      }

      const cleanCharacter: ICharacter = {
        id: cleanCharacterData.id,
        name: cleanCharacterData.name,
        ki: cleanCharacterData.ki,
        race: cleanCharacterData.race,
        image: cleanCharacterData.image,
        affiliation: cleanCharacterData.affiliation,
      };

      affiliationMap.get(affiliation)!.push(cleanCharacter);
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
