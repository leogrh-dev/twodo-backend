import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';
import { Note } from '../../entities/note.entity';

@Injectable()
export class UpdateNoteBannerUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(noteId: string, newBannerUrl: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) {
      throw new Error('Nota não encontrada');
    }

    if (note.ownerId !== userId) {
      throw new Error('Você não tem permissão para alterar esta nota');
    }

    note.updateBanner(newBannerUrl.trim());

    return this.noteRepository.update(note);
  }
}