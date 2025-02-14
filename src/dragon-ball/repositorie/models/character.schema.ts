import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ki: string;

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  image: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
