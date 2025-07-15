import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import { DeleteFileUseCase } from '../file/delete-file.usecase';

@Injectable()
export class RemoveUserIconUseCase {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepo: AuthRepository,
        private readonly deleteFile: DeleteFileUseCase,
    ) { }

    async execute(userId: string, currentIconUrl: string | null): Promise<void> {
        if (currentIconUrl?.startsWith('http')) {
            await this.deleteFile.execute(currentIconUrl);
        }

        await this.authRepo.removeIconUrl(userId);
    }
}