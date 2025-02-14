import { Module } from '@nestjs/common';
import { CharactersModule } from './dragon-ball/characters/characters.module';
import { PlanetsModule } from './dragon-ball/planets/planets.module';
import { RepositorieModule } from './dragon-ball/repositorie/repositorie.module';
import { DatabaseModule } from './config/database/database/database.module';

@Module({
  imports: [DatabaseModule, CharactersModule, PlanetsModule, RepositorieModule],
})
export class AppModule {}
