import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRepository } from '../../../application/interfaces/auth-repository.interface';
import { User } from '../../../core/entities/user.entity';
import { UserModel, UserDocument } from '../models/user.schema';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  async findByEmail(email: string): Promise<User | null> {

    const userDoc = await this.userModel.findOne({ email });

    if (!userDoc) return null;

    return new User(userDoc._id.toString(), userDoc.email, userDoc.password);
  }

  async create(user: User): Promise<User> {
    const created = await this.userModel.create({
      email: user.email,
      password: user.password,
    });

    return new User(
      created._id.toString(),
      created.email,
      created.password,
    );
  }
}
