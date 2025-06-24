import { Injectable, Inject } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ConfirmEmailUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(token: string): Promise<void> {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default-secret',
      ) as { userId: string };

      await this.authRepository.confirmEmail(payload.userId);
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
}