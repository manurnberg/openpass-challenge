import { IsOptional, IsString } from 'class-validator';

export class QueryParamsDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly gender: string;

  @IsString()
  @IsOptional()
  readonly race: string;

  @IsString()
  @IsOptional()
  readonly affiliation: string;
}
