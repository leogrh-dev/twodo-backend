import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Note as NoteEntity } from '../../../core/entities/note.entity';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';
import { Note, NoteDocument } from '../models/note.schema';

@Injectable()
export class NoteRepositoryImpl implements NoteRepository {
    constructor(
        @InjectModel(Note.name) private readonly Note: Model<NoteDocument>,
    ) { }

    async create(note: NoteEntity): Promise<NoteEntity> {
        const created = await this.Note.create(note);
        return this.toEntity(created);
    }

    async findById(id: string): Promise<NoteEntity | null> {
        const doc = await this.Note.findOne({ id }).exec();
        return doc ? this.toEntity(doc) : null;
    }

    async update(note: NoteEntity): Promise<NoteEntity> {
        const updated = await this.Note
            .findOneAndUpdate({ id: note.id }, note, { new: true })
            .exec();

        if (!updated) throw new Error('Note not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.Note.deleteOne({ id }).exec();
    }

    private toEntity(doc: NoteDocument): NoteEntity {
        return new NoteEntity(
            doc.id,
            doc.title,
            doc.content,
            doc.ownerId,
            doc.bannerUrl,
            doc.createdAt,
            doc.updatedAt,
        );
    }
}
