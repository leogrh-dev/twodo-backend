import { Injectable, Inject } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfirmEmailService } from '../../../infrastructure/services/confirm-email/confirm-email.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,

    private readonly confirmEmailService: ConfirmEmailService, // Serviço de envio de email
  ) { }

  async execute(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      '',
      name,
      email,
      phone,
      hashedPassword,
      false,
    );

    const createdUser = await this.authRepository.create(user);

    const token = jwt.sign(
      { userId: createdUser.id },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '1d' },
    );

    const confirmLink = `http://localhost:4200/confirm-email?token=${token}`;

    await this.confirmEmailService.sendEmail(
      createdUser.email,
      'Confirme seu email no TwoDo',
      `
      <h1>Bem-vindo, ${createdUser.name}!</h1>
      <p>Para ativar sua conta, clique no link abaixo:</p>
      <a href="${confirmLink}">Confirmar meu e-mail</a>
      <br/>
      <p>Se você não criou essa conta, ignore este e-mail.</p>
      `,
    );

    return createdUser;
  }
}
