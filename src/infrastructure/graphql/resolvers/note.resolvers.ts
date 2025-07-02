import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateNoteUseCase } from '../../../core/use-cases/note/create-note.usecase';
import { FindNoteByIdUseCase } from '../../../core/use-cases/note/find-note-by-id.usecase';
import { FindNotesByOwnerUseCase } from '../../../core/use-cases/note/find-notes-by-owner.usecase';
import { UpdateNoteTitleUseCase } from '../../../core/use-cases/note/update-note-title.usecase';

import { NoteOutput } from '../dto/note.output';
import { UpdateNoteTitleInput } from '../dto/note.input';

import { AuthGuard } from '../../../shared/guards/auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

@Resolver(() => NoteOutput)
export class NoteResolver {
    constructor(
        private readonly createNoteUseCase: CreateNoteUseCase,
        private readonly findNoteByIdUseCase: FindNoteByIdUseCase,
        private readonly findNotesByOwnerUseCase: FindNotesByOwnerUseCase,
        private readonly updateNoteTitleUseCase: UpdateNoteTitleUseCase,
    ) { }

    @Mutation(() => NoteOutput)
    @UseGuards(AuthGuard)
    async createNote(
        @CurrentUser() user: { userId: string },
    ): Promise<NoteOutput> {
        const note = await this.createNoteUseCase.execute({ ownerId: user.userId });
        return this.toOutput(note);
    }

    @Query(() => NoteOutput)
    @UseGuards(AuthGuard)
    async getNoteById(
        @Args('id') id: string,
        @CurrentUser() user: { userId: string }
    ): Promise<NoteOutput> {
        const note = await this.findNoteByIdUseCase.execute(id, user.userId);
        return this.toOutput(note);
    }

    @Query(() => [NoteOutput])
    @UseGuards(AuthGuard)
    async getUserNotes(
        @CurrentUser() user: { userId: string }
    ): Promise<NoteOutput[]> {
        const notes = await this.findNotesByOwnerUseCase.execute(user.userId);
        return notes.map(this.toOutput);
    }

    @Mutation(() => NoteOutput)
    @UseGuards(AuthGuard)
    async updateNoteTitle(
        @Args('input') input: UpdateNoteTitleInput,
        @CurrentUser() user: { userId: string }
    ): Promise<NoteOutput> {
        const updated = await this.updateNoteTitleUseCase.execute(
            input.id,
            input.title,
            user.userId
        );
        return this.toOutput(updated);
    }

    private toOutput(note: {
        id: string;
        title: string;
        content: string;
        ownerId: string;
        bannerUrl?: string;
        createdAt: Date;
        updatedAt: Date;
    }): NoteOutput {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            ownerId: note.ownerId,
            bannerUrl: note.bannerUrl,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        };
    }
}