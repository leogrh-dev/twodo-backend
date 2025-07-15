import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import { User } from '../../entities/user.entity';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }
}
