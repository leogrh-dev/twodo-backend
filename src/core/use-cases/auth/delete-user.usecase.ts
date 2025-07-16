import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';
import { DeleteFileUseCase } from '../file/delete-file.usecase';

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,

        @Inject(NoteRepository)
        private readonly noteRepository: NoteRepository,

        private readonly deleteFileUseCase: DeleteFileUseCase,
    ) { }

    async execute(userId: string): Promise<void> {
        const user = await this.authRepository.findById(userId);
        if (!user) throw new Error('Usuário não encontrado');

        if (user.iconUrl?.startsWith('http')) {
            await this.deleteFileUseCase.execute(user.iconUrl);
        }

        const notes = await this.noteRepository.findByOwner(userId);
        for (const note of notes) {
            const filesToDelete = [note.bannerUrl, note.iconUrl, ...(note.attachedFiles ?? [])];
            for (const file of filesToDelete) {
                if (file?.startsWith('http')) {
                    await this.deleteFileUseCase.execute(file);
                }
            }
        }

        await this.noteRepository.deleteByOwner(userId);
        await this.authRepository.deleteById(userId);
    }
}
