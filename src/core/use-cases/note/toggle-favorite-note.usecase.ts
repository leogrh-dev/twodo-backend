import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';

@Injectable()
export class ToggleFavoriteNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) { }

  async execute(noteId: string, userId: string): Promise<void> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) throw new Error('Nota não encontrada.');
    if (note.ownerId !== userId) throw new Error('Acesso negado.');
    if (note.isDeleted) throw new Error('Não é possível favoritar notas excluídas.');

    note.toggleFavorite();
    await this.noteRepository.toggleFavorite(note.id, note.isFavorite);
  }
}