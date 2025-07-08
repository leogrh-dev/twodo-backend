import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Note } from '../../../core/entities/note.entity';
import { CreateNoteUseCase } from '../../../core/use-cases/note/create-note.usecase';
import { FindNoteByIdUseCase } from '../../../core/use-cases/note/find-note-by-id.usecase';
import { FindNotesByOwnerUseCase } from '../../../core/use-cases/note/find-notes-by-owner.usecase';
import { UpdateNoteTitleUseCase } from '../../../core/use-cases/note/update-note-title.usecase';
import { UpdateNoteBannerUseCase } from 'src/core/use-cases/note/update-note-banner.usecase';
import { UpdateNoteContentUseCase } from 'src/core/use-cases/note/update-note-content.usecase';
import { RemoveNoteBannerUseCase } from 'src/core/use-cases/note/remove-note-banner.usecase';

import { NoteOutput } from '../dto/note.output';
import { RemoveNoteBannerInput, UpdateNoteBannerInput, UpdateNoteContentInput, UpdateNoteTitleInput } from '../dto/note.input';

import { AuthGuard } from '../../../shared/guards/auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { GetDeletedNotesUseCase } from 'src/core/use-cases/note/get-deleted-notes.usecase';
import { DeleteNoteUseCase } from 'src/core/use-cases/note/delete-note.usecase';
import { RestoreNoteUseCase } from 'src/core/use-cases/note/restore-note.usecase';
import { PermanentlyDeleteNoteUseCase } from 'src/core/use-cases/note/permanently-delete-note.usecase';

@Resolver(() => NoteOutput)
export class NoteResolver {
    constructor(
        private readonly createNoteUseCase: CreateNoteUseCase,
        private readonly findNoteByIdUseCase: FindNoteByIdUseCase,
        private readonly findNotesByOwnerUseCase: FindNotesByOwnerUseCase,
        private readonly updateNoteTitleUseCase: UpdateNoteTitleUseCase,
        private readonly updateNoteContentUseCase: UpdateNoteContentUseCase,
        private readonly updateNoteBannerUseCase: UpdateNoteBannerUseCase,
        private readonly removeNoteBannerUseCase: RemoveNoteBannerUseCase,
        private readonly deleteNoteUseCase: DeleteNoteUseCase,
        private readonly getDeletedNotesUseCase: GetDeletedNotesUseCase,
        private readonly restoreNoteUseCase: RestoreNoteUseCase,
        private readonly permanentlyDeleteNoteUseCase: PermanentlyDeleteNoteUseCase,
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

    @Mutation(() => NoteOutput)
    @UseGuards(AuthGuard)
    async updateNoteContent(
        @Args('input') input: UpdateNoteContentInput,
        @CurrentUser() user: { userId: string }
    ): Promise<NoteOutput> {
        const updated = await this.updateNoteContentUseCase.execute(
            input.id,
            input.content,
            user.userId
        );
        return this.toOutput(updated);
    }

    @Mutation(() => NoteOutput)
    @UseGuards(AuthGuard)
    async updateNoteBanner(
        @Args('input') input: UpdateNoteBannerInput,
        @CurrentUser() user: { userId: string },
    ): Promise<NoteOutput> {
        const note = await this.updateNoteBannerUseCase.execute(input.id, input.bannerUrl, user.userId);
        return this.toOutput(note);
    }

    @Mutation(() => NoteOutput)
    @UseGuards(AuthGuard)
    async removeNoteBanner(
        @Args('input') input: RemoveNoteBannerInput,
        @CurrentUser() user: { userId: string },
    ): Promise<NoteOutput> {
        const note = await this.removeNoteBannerUseCase.execute(input.id, user.userId);
        return this.toOutput(note);
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async deleteNote(
        @Args('id') id: string,
        @CurrentUser() user: { userId: string },
    ): Promise<boolean> {
        await this.deleteNoteUseCase.execute(id, user.userId);
        return true;
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async restoreNote(
        @Args('id') id: string,
        @CurrentUser() user: { userId: string },
    ): Promise<boolean> {
        await this.restoreNoteUseCase.execute(id, user.userId);
        return true;
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async permanentlyDeleteNote(
        @Args('id') id: string,
        @CurrentUser() user: { userId: string },
    ): Promise<boolean> {
        await this.permanentlyDeleteNoteUseCase.execute(id, user.userId);
        return true;
    }

    @Query(() => [NoteOutput])
    @UseGuards(AuthGuard)
    async getDeletedNotes(
        @CurrentUser() user: { userId: string },
    ): Promise<NoteOutput[]> {
        const notes = await this.getDeletedNotesUseCase.execute(user.userId);
        return notes.map(this.toOutput);
    }

    private toOutput(note: Note): NoteOutput {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            ownerId: note.ownerId,
            bannerUrl: note.bannerUrl ?? null,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            isDeleted: note.isDeleted,
        };
    }
}