import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Note } from '../../entities/note.entity';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';

@Injectable()
export class FindNoteByIdUseCase {
  constructor(private readonly noteRepository: NoteRepository) { }

  async execute(noteId: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NotFoundException('Nota não encontrada');
    }

    if (note.ownerId !== userId) {
      throw new ForbiddenException('Acesso negado à nota');
    }

    return note;
  }
}