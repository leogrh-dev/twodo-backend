import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';

@Injectable()
export class VerifyPasswordUseCase {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,
    ) { }

    async execute(userId: string, password: string): Promise<boolean> {
        const user = await this.authRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return bcrypt.compare(password, user.password);
    }
}