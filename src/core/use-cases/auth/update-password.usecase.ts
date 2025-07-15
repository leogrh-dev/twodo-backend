import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';

@Injectable()
export class UpdatePasswordUseCase {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,
    ) { }

    async execute(userId: string, newPassword: string): Promise<void> {
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.authRepository.updatePassword(userId, hashed);
    }
}