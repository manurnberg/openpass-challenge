import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPlanetRepository } from '../interfaces/planet-repository.interface';
import { Planet } from '../models';

@Injectable()
export class PlanetRepository implements IPlanetRepository {
  constructor(
    @InjectModel(Planet.name) private readonly model: Model<Planet>,
  ) {}

  async create(planet: Planet): Promise<Planet> {
    if (planet.affiliationReport) {
      planet.affiliationReport.forEach((report) => {
        report.characters.forEach((character) => {
          if (character.ki) {
            character.ki = character.ki.trim();
          }
        });
      });
    }

    const newPlanet = new this.model(planet);
    await newPlanet.save();

    return await this.model
  .aggregate([
    { $match: { id: planet.id } },
    {
      $project: {
        _id: 0,
        'affiliationReport._id': 0,
        'affiliationReport.characters._id': 0,
        'affiliationReport.characters.affiliation': 0,
      },
    },
    {
      $set: {
        affiliationReport: {
          $map: {
            input: '$affiliationReport',
            as: 'affiliation',
            in: {
              affiliation: '$$affiliation.affiliation',
              characters: {
                $sortArray: {
                  input: {
                    $map: {
                      input: '$$affiliation.characters',
                      as: 'character',
                      in: {
                        // Limpiar los puntos como separadores de miles y convertir "ki" a número
                        $mergeObjects: [
                          '$$character',
                          {
                            ki: {
                              $toDouble: {
                                $replaceAll: {
                                  input: '$$character.ki',
                                  find: '.', // Reemplazar el punto (puedes usar ',' si usas comas como separador de miles)
                                  replacement: '', // Eliminar el punto
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                  sortBy: { ki: -1 }, // Orden descendente por "ki"
                },
              },
            },
          },
        },
      },
    },
  ])
  .then((res) => res[0] || null);

  }

  async findById(id: number): Promise<Planet | null> {
    return await this.model
      .aggregate([
        { $match: { id } }, // Filtrar por ID
        {
          $project: {
            _id: 0,
            'affiliationReport._id': 0,
            'affiliationReport.characters._id': 0,
            'affiliationReport.characters.affiliation': 0, // Excluir affiliation de cada character
          },
        },
        {
          $set: {
            affiliationReport: {
              $map: {
                input: '$affiliationReport',
                as: 'affiliation',
                in: {
                  affiliation: '$$affiliation.affiliation',
                  characters: {
                    $sortArray: {
                      input: '$$affiliation.characters',
                      sortBy: { ki: -1 },
                    },
                  },
                },
              },
            },
          },
        },
      ])
      .then((res) => res[0] || null);
  }

  async findAll(): Promise<Planet[]> {
    return await this.model.find().exec();
  }

  async update(id: number, planet: Partial<Planet>): Promise<Planet | null> {
    return await this.model
      .findOneAndUpdate({ id }, planet, { new: true })
      .exec();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.model.deleteOne({ id }).exec();
    return result.deletedCount > 0;
  }
}
