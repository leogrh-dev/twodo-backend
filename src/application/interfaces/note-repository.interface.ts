import { Note } from '../../core/entities/note.entity';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<Note>;
  abstract findById(id: string): Promise<Note | null>;
  abstract findByOwner(ownerId: string, limit?: number): Promise<Note[]>;
  abstract update(note: Note): Promise<Note>;
  abstract updateTitle(noteId: string, title: string): Promise<Note>;
  abstract softDelete(id: string): Promise<void>;
  abstract restore(id: string): Promise<void>;
  abstract findDeletedByOwner(ownerId: string): Promise<Note[]>;
  abstract permanentlyDelete(id: string): Promise<void>;
  abstract toggleFavorite(id: string, isFavorite: boolean): Promise<void>;
}
