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

    return new User(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.phone,
      userDoc.password,
      userDoc.emailVerified,
      userDoc.iconUrl ?? null
    );
  }

  async findById(userId: string): Promise<User | null> {
    const userDoc = await this.userModel.findById(userId);
    if (!userDoc) return null;

    return new User(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.phone,
      userDoc.password,
      userDoc.emailVerified,
      userDoc.iconUrl ?? null
    );
  }

  async create(user: User): Promise<User> {
    const created = await this.userModel.create({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });

    return new User(
      created._id.toString(),
      created.name,
      created.email,
      created.phone,
      created.password,
    );
  }

  async confirmEmail(userId: string): Promise<void> {
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { emailVerified: true } },
    );
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } },
    );
  }

  async updateIconUrl(userId: string, url: string): Promise<void> {
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { iconUrl: url } },
    );
  }

  async removeIconUrl(userId: string): Promise<void> {
    await this.userModel.updateOne(
      { _id: userId },
      { $unset: { iconUrl: "" } },
    );
  }
}
