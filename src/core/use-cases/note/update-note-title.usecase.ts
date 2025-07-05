import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/note.entity';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';

@Injectable()
export class UpdateNoteTitleUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(noteId: string, newTitle: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) {
      throw new Error('Nota não encontrada');
    }

    if (note.ownerId !== userId) {
      throw new Error('Você não tem permissão para alterar esta nota');
    }

    note.updateTitle(newTitle.trim());

    return this.noteRepository.update(note);
  }
}