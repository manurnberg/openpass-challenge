import { IsString, IsInt, IsOptional, IsUrl, Length } from 'class-validator';

export class CharacterDto {
  @IsInt()
  readonly id: number;

  @IsString()
  @Length(1, 100)
  readonly name: string;

  @IsString()
  readonly ki: string;

  @IsString()
  readonly maxKi: string;

  @IsString()
  @Length(1, 50)
  readonly race: string;

  @IsString()
  @Length(1, 20)
  readonly gender: string;

  @IsString()
  @Length(1, 500)
  readonly description: string;

  @IsUrl()
  readonly image: string;

  @IsString()
  @Length(1, 50)
  readonly affiliation: string;

  @IsOptional()
  readonly deletedAt?: Date | null;
}
