import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import * as jwt from 'jsonwebtoken';
import { SendEmailService } from 'src/infrastructure/services/send-email/send-email.service';

@Injectable()
export class ResendEmailConfirmationUseCase {
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    private readonly sendEmailService: SendEmailService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.authRepository.findByEmail(email);
    if (!user || user.emailVerified) return;

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '1d' },
    );

    const confirmLink = `http://localhost:4200/confirm-email?token=${token}`;

    await this.sendEmailService.sendEmail(
      user.email,
      'Confirme seu email no TwoDo',
      `
      <h1>Olá, ${user.name}!</h1>
      <p>Para ativar sua conta, clique no link abaixo:</p>
      <a href="${confirmLink}">Confirmar meu e-mail</a>
      <p>Se você não criou essa conta, ignore este e-mail.</p>
      `,
    );
  }
}
