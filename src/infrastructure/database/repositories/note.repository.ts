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

    async update(note: NoteEntity): Promise<NoteEntity> {
        const updated = await this.Note
            .findOneAndUpdate({ id: note.id }, note, { new: true })
            .exec();

        if (!updated) throw new Error('Note not found');
        return this.toEntity(updated);
    }

    async updateTitle(noteId: string, title: string): Promise<NoteEntity> {
        const updated = await this.Note
            .findOneAndUpdate(
                { id: noteId },
                { title: title.trim() || 'Nova página', updatedAt: new Date() },
                { new: true }
            )
            .exec();

        if (!updated) throw new Error('Note not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.Note.deleteOne({ id }).exec();
    }

    async findByOwner(ownerId: string, limit = 10): Promise<NoteEntity[]> {
        const docs = await this.Note
            .find({ ownerId })
            .sort({ updatedAt: -1 })
            .limit(limit)
            .exec();

        return docs.map(doc => this.toEntity(doc));
    }

    async findById(noteId: string): Promise<NoteEntity | null> {
        const doc = await this.Note.findOne({ id: noteId }).lean();
        if (!doc) return null;

        return new NoteEntity(
            doc.id,
            doc.title,
            doc.content,
            doc.ownerId,
            doc.bannerUrl,
            doc.createdAt,
            doc.updatedAt
        );
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
