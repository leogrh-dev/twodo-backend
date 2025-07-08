import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop()
  bannerUrl?: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export type NoteDocument = Note & Document & {
  createdAt: Date;
  updatedAt: Date;
};

export const NoteSchema = SchemaFactory.createForClass(Note);

NoteSchema.set('strict', true);

NoteSchema.index({ id: 1 }, { unique: true });
