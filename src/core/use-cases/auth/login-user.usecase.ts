import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository
  ) { }

  async execute(email: string, password: string, rememberMe: boolean = false): Promise<{ accessToken: string }> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const expiresIn = rememberMe ? '7d' : '1d';

    const accessToken = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        emailVerified: user.emailVerified,
      },
      process.env.JWT_SECRET || 'default-secret',
      {
        expiresIn,
      }
    );

    return { accessToken };
  }
}