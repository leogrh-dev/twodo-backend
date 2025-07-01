import { Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateNoteUseCase } from '../../../core/use-cases/note/create-note.usecase';
import { NoteOutput } from '../dto/note.output';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

@Resolver(() => NoteOutput)
export class NoteResolver {
    constructor(
        private readonly createNoteUseCase: CreateNoteUseCase,
    ) { }

    @Mutation(() => NoteOutput)
    @UseGuards(AuthGuard)
    async createNote(
        @CurrentUser() user: { userId: string },
    ): Promise<NoteOutput> {

        const note = await this.createNoteUseCase.execute({
            ownerId: user.userId,
        });

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