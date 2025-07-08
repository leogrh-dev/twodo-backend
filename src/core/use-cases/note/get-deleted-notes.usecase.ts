import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';
import { Note } from '../../entities/note.entity';

@Injectable()
export class GetDeletedNotesUseCase {
    constructor(private readonly noteRepository: NoteRepository) { }

    async execute(userId: string): Promise<Note[]> {
        return this.noteRepository.findDeletedByOwner(userId);
    }
}