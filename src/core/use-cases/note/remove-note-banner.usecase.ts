import { Inject, Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';
import { DeleteFileUseCase } from '../file/delete-file.usecase';
import { Note } from '../../entities/note.entity';

@Injectable()
export class RemoveNoteBannerUseCase {
  constructor(
    @Inject(NoteRepository)
    private readonly noteRepository: NoteRepository,
    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) { }

  async execute(noteId: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) throw new Error('Nota não encontrada');
    if (note.ownerId !== userId) throw new Error('Você não tem permissão');

    if (note.bannerUrl?.startsWith('http')) {
      await this.deleteFileUseCase.execute(note.bannerUrl);
    }

    note.updateBanner(null);
    return this.noteRepository.update(note);
  }
}