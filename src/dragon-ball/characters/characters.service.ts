import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CharactersResponseDto, QueryParamsDto } from './dto';
import { envs } from '../../config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  private useFilters(filters: QueryParamsDto, apiUrl: string): string {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    return `${apiUrl}?${params.toString()}`;
  }

  async getCharacters(filters: QueryParamsDto): Promise<CharactersResponseDto> {
    try {
      const dragonBallApiUrl = `${envs.dragonBallApiUrl}/characters`;

      const finalUrl = this.useFilters(filters, dragonBallApiUrl);
      const apiRequest = this.httpService.get(finalUrl);

      const { data, status }: AxiosResponse = await firstValueFrom(apiRequest);

      if (status !== HttpStatus.OK) throw new HttpException(data, status);

      return data;
    } catch (error) {
      const message = error.response?.data?.title || 'unexpected error';
      const status =
        error.response?.data?.status || HttpStatus.INTERNAL_SERVER_ERROR;

      throw new HttpException(message, status);
    }
  }
}
