import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';

import { User } from '../../entities/user.entity';
import { SendEmailService } from 'src/infrastructure/services/send-email/send-email.service';

import { getDefaultNotesForUser } from './default-notes';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,

    private readonly noteRepository: NoteRepository,

    private readonly sendEmailService: SendEmailService,
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

    await this.createDefaultNotesForUser(createdUser.id); // ✅ separação limpa

    const token = jwt.sign(
      { userId: createdUser.id },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '1d' },
    );

    const confirmLink = `http://localhost:4200/confirm-email?token=${token}`;

    await this.sendEmailService.sendEmail(
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

  private async createDefaultNotesForUser(userId: string): Promise<void> {
    const notes = getDefaultNotesForUser(userId);

    for (const note of notes) {
      await this.noteRepository.create(note);
    }
  }
}