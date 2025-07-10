import { Injectable, Inject } from '@nestjs/common';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';
import { Note } from '../../entities/note.entity';
import { DeleteFileUseCase } from '../file/delete-file.usecase';

@Injectable()
export class UpdateNoteIconUseCase {
  constructor(
    @Inject(NoteRepository)
    private readonly noteRepository: NoteRepository,
    private readonly deleteFileUseCase: DeleteFileUseCase
  ) {}

  async execute(noteId: string, newIconUrl: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) throw new Error('Nota não encontrada');
    if (note.ownerId !== userId) throw new Error('Você não tem permissão');

    if (note.iconUrl?.startsWith('http')) {
      await this.deleteFileUseCase.execute(note.iconUrl);
    }

    note.updateIcon(newIconUrl.trim());
    return this.noteRepository.update(note);
  }
}