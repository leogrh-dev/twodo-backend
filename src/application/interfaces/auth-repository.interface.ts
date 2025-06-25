import { User } from '../../core/entities/user.entity';

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  confirmEmail(userId: string): Promise<void>;
  updatePassword(userId: string, hashedPassword: string): Promise<void>;
}