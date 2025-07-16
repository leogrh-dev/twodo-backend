import { Injectable, Inject } from '@nestjs/common';
import { AuthRepository } from 'src/application/interfaces/auth-repository.interface';

@Injectable()
export class UpdateUserNameUseCase {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,
    ) { }

    async execute(userId: string, newName: string): Promise<void> {
        if (!newName.trim()) throw new Error('Nome inválido');
        await this.authRepository.updateUserName(userId, newName.trim());
    }
}
