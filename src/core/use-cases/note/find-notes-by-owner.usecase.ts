import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/note.entity';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';

@Injectable()
export class FindNotesByOwnerUseCase {
  constructor(private readonly noteRepository: NoteRepository) { }

  async execute(ownerId: string): Promise<Note[]> {
    return this.noteRepository.findByOwner(ownerId, 100);
  }
}