import { Injectable, Inject } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
import { User } from '../../entities/user.entity';

@Injectable()
export class LoginWithGoogleUseCase {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(idToken: string): Promise<{ accessToken: string }> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Google token inválido');
    }

    const email = payload.email;
    const name = payload.name || 'Usuário Google';
    const phone = '';

    if (!email) {
      throw new Error('Email não encontrado no Google');
    }

    let user = await this.authRepository.findByEmail(email);
    if (!user) {
      const newUser = new User('', name, email, phone, '');
      user = await this.authRepository.create(newUser);
    }

    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || 'default-secret',
      {
        expiresIn: '7d',
      },
    );

    return { accessToken };
  }
}
