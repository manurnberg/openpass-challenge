import {
  IsArray,
  IsInt,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CharacterDto } from './character.dto';

class MetaDto {
  @IsInt()
  readonly totalItems: number;

  @IsInt()
  readonly itemCount: number;

  @IsInt()
  readonly itemsPerPage: number;

  @IsInt()
  readonly totalPages: number;

  @IsInt()
  readonly currentPage: number;
}

class LinksDto {
  @IsUrl()
  readonly first: string;

  @IsOptional()
  @IsUrl()
  readonly previous?: string;

  @IsOptional()
  @IsUrl()
  readonly next?: string;

  @IsUrl()
  readonly last: string;
}

export class CharactersResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterDto)
  readonly items: CharacterDto[];

  @ValidateNested()
  @Type(() => MetaDto)
  readonly meta: MetaDto;

  @ValidateNested()
  @Type(() => LinksDto)
  readonly links: LinksDto;
}
