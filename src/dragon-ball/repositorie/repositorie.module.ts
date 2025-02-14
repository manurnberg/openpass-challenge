import { Module } from '@nestjs/common';
import { PlanetRepository } from './repositories/planet-report.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Planet, PlanetSchema } from './models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Planet.name, schema: PlanetSchema }]),
  ],
  providers: [PlanetRepository],
  exports: [PlanetRepository],
})
export class RepositorieModule {}
