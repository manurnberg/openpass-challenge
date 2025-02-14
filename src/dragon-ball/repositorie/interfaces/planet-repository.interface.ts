import { Planet } from '../models';

export interface IPlanetRepository {
  create(planet: Planet): Promise<Planet>;
  findById(id: number): Promise<Planet | null>;
  findAll(): Promise<Planet[]>;
  update(id: number, planet: Partial<Planet>): Promise<Planet | null>;
  delete(id: number): Promise<boolean>;
}
