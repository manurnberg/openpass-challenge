import { Controller, Get, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersResponseDto, QueryParamsDto } from './dto';

@Controller({ path: 'dragon-ball', version: '1' })
export class CharactersController {
  constructor(private readonly dragonBallService: CharactersService) {}

  @Get('/')
  async getCharacters(
    @Query() queryParamsDto: QueryParamsDto,
  ): Promise<CharactersResponseDto> {
    return this.dragonBallService.getCharacters(queryParamsDto);
  }
}
