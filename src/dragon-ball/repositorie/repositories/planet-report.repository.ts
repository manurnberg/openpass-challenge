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
    const newPlanet = new this.model(planet);
    return await newPlanet.save();
  }

  async findById(id: number): Promise<Planet | null> {
    return await this.model.findOne({ id }).exec();
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
