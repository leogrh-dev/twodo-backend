import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';

@Injectable()
export class UpdateUserIconUseCase {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepo: AuthRepository,
    ) { }

    async execute(userId: string, url: string): Promise<void> {
        await this.authRepo.updateIconUrl(userId, url.trim());
    }
}