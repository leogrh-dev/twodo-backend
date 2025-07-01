import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import * as jwt from 'jsonwebtoken';
import { SendEmailService } from 'src/infrastructure/services/send-email/send-email.service';

@Injectable()
export class RequestPasswordResetUseCase {
  constructor(
    @Inject('AuthRepository') private readonly authRepo: AuthRepository,
    private readonly emailService: SendEmailService,
  ) { }

  async execute(email: string): Promise<void> {
    const user = await this.authRepo.findByEmail(email);
    if (!user) return;

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '1h' },
    );

    const link = `http://localhost:4200/reset-password?token=${token}`;

    await this.emailService.sendEmail(
      email,
      'Recuperação de Senha - TwoDo',
      `
        <h2>Recuperação de Senha</h2>
        <p>Para redefinir sua senha, clique no link abaixo:</p>
        <a href="${link}">${link}</a>
        <p>Se não foi você, ignore este e-mail.</p>
      `,
    );
  }
}
