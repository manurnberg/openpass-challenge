import { Controller, Get, Param } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetReportResponseDto } from './dto';

@Controller({ path: 'planets', version: '1' })
export class PlanetsController {
  constructor(private readonly plantesService: PlanetsService) {}

  @Get('/:id')
  async getPlanetById(
    @Param('id') id: string,
  ): Promise<PlanetReportResponseDto> {
    return this.plantesService.getPlanetById(id);
  }
}
