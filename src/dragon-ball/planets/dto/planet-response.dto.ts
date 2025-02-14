import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CharacterDto } from '../../characters/dto';

export class PlanetResponseDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly isDestroyed: boolean;

  @IsString()
  readonly description: string;

  @IsString()
  readonly image: string;

  @IsOptional()
  @IsString()
  readonly deletedAt?: string | null;

  @ValidateNested({ each: true })
  @Type(() => CharacterDto)
  readonly characters: CharacterDto[];
}
