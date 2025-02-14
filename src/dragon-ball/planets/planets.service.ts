import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PlanetRepository } from '../repositorie/repositories/planet-report.repository';
import { envs } from 'src/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  IPlanetReportResponse,
  IPlanetResponse,
} from './interfaces/planet-adapter.interface';
import { PlanetAdapter } from './adapters/planet-report.adapter';
import { PlanetReportResponseDto } from './dto';

@Injectable()
export class PlanetsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly planetRepository: PlanetRepository,
  ) {}

  async getPlanetById(id: string): Promise<PlanetReportResponseDto> {
    const planetReport: IPlanetReportResponse =
      await this.planetRepository.findById(Number(id));

    if (!planetReport) {
      try {
        const dragonBallApiUrl = `${envs.dragonBallApiUrl}/planets/${id}`;

        const apiRequest = this.httpService.get(dragonBallApiUrl);

        const { data, status }: AxiosResponse =
          await firstValueFrom(apiRequest);

        if (status !== HttpStatus.OK) throw new HttpException(data, status);

        const planetResponse: IPlanetResponse = data;
        const planetReport =
          PlanetAdapter.toPlanetReportResponse(planetResponse);

        return this.planetRepository.create(planetReport);
      } catch (error) {
        const message = error.response?.data?.title || 'unexpected error';
        const status =
          error.response?.data?.status || HttpStatus.INTERNAL_SERVER_ERROR;

        throw new HttpException(message, status);
      }
    }

    return planetReport;
  }
}
