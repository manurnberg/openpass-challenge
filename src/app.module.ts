import { Module } from '@nestjs/common';
import { CharactersModule } from './dragon-ball/characters/characters.module';
import { PlanetsModule } from './dragon-ball/planets/planets.module';

@Module({
  imports: [CharactersModule, PlanetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
