import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject('AuthRepository') private readonly authRepo: AuthRepository
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as { sub: string };
      const userId = decoded.sub;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.authRepo.updatePassword(userId, hashedPassword);
    } catch {
      throw new Error('Token inválido ou expirado');
    }
  }
}