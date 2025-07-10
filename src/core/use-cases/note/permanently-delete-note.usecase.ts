import { Inject, Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';
import { DeleteFileUseCase } from '../file/delete-file.usecase';

@Injectable()
export class PermanentlyDeleteNoteUseCase {
  constructor(
    @Inject(NoteRepository)
    private readonly noteRepository: NoteRepository,
    private readonly deleteFileUseCase: DeleteFileUseCase
  ) {}

  async execute(noteId: string, userId: string): Promise<void> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) throw new Error('Nota não encontrada');
    if (note.ownerId !== userId) throw new Error('Acesso negado');

    if (note.bannerUrl?.startsWith('http')) {
      await this.deleteFileUseCase.execute(note.bannerUrl);
    }

    if (note.iconUrl?.startsWith('http')) {
      await this.deleteFileUseCase.execute(note.iconUrl);
    }

    for (const url of note.attachedFiles) {
      if (url.startsWith('http')) {
        await this.deleteFileUseCase.execute(url);
      }
    }

    await this.noteRepository.permanentlyDelete(noteId);
  }
}