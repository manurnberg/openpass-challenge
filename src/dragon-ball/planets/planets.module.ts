import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { RepositorieModule } from '../repositorie/repositorie.module';
import { PlanetsService } from './planets.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RepositorieModule, HttpModule],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
