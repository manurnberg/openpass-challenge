import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AffiliationReport } from './affiliation-report.schema';

export type PlanetDocument = HydratedDocument<Planet>;

@Schema({ versionKey: false })
export class Planet {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: SchemaFactory.createForClass(AffiliationReport) }],
    default: [],
  })
  affiliationReport: AffiliationReport[];
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);
