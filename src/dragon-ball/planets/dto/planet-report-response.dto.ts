import {
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

class CharacterDto {
  @IsInt()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly ki: string;

  @IsString()
  readonly race: string;

  @IsUrl()
  readonly image: string;
}

class AffiliationReportDto {
  @IsString()
  readonly affiliation: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterDto)
  readonly characters: CharacterDto[];
}

export class PlanetReportResponseDto {
  @IsInt()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AffiliationReportDto)
  readonly affiliationReport: AffiliationReportDto[];
}
