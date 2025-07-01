import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop()
  bannerUrl?: string;
}

export type NoteDocument = Note & Document & {
  createdAt: Date;
  updatedAt: Date;
};

export const NoteSchema = SchemaFactory.createForClass(Note);
