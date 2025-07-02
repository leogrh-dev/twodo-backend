import { Note } from '../../core/entities/note.entity';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<Note>;
  abstract findById(id: string): Promise<Note | null>;
  abstract findByOwner(ownerId: string, limit?: number): Promise<Note[]>;
  abstract update(note: Note): Promise<Note>;
  abstract updateTitle(noteId: string, title: string): Promise<Note>;
  abstract delete(id: string): Promise<void>;
}
