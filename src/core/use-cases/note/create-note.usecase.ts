import { Inject, Injectable } from '@nestjs/common';
import { Note } from '../../entities/note.entity';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';
import { v4 as uuidv4 } from 'uuid';

interface CreateNoteInput {
    ownerId: string;
}

@Injectable()
export class CreateNoteUseCase {
    constructor(
        private readonly noteRepository: NoteRepository,
    ) { }

    async execute(input: CreateNoteInput): Promise<Note> {
        const note = new Note(
            uuidv4(),
            '',
            '',
            input.ownerId,
            undefined,
        );

        return this.noteRepository.create(note);
    }
}
