import { User } from '../../core/entities/user.entity';

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  deleteById(userId: string): Promise<void>;
  create(user: User): Promise<User>;
  confirmEmail(userId: string): Promise<void>;
  updateUserName(userId: string, newName: string): Promise<void>;
  updatePassword(userId: string, hashedPassword: string): Promise<void>;
  updateIconUrl(userId: string, url: string): Promise<void>;
  removeIconUrl(userId: string): Promise<void>;
}