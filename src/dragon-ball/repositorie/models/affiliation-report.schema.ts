import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Character } from './character.schema';

export type AffiliationReportDocument = HydratedDocument<AffiliationReport>;

@Schema({ versionKey: false })
export class AffiliationReport {
  @Prop({ required: true })
  affiliation: string;

  @Prop({
    type: [{ type: SchemaFactory.createForClass(Character) }],
    default: [],
  })
  characters: Character[];
}

export const AffiliationReportSchema =
  SchemaFactory.createForClass(AffiliationReport);
