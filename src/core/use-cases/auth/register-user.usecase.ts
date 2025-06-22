import { Injectable, Inject } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) { }

  async execute(email: string, password: string): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User('', email, hashedPassword);

    const createdUser = await this.authRepository.create(user);
    return createdUser;
  }
}