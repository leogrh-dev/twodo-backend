import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { RegisterUserUseCase } from '../../core/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from '../../core/use-cases/auth/login-user.usecase';
import { LoginWithGoogleUseCase } from '../../core/use-cases/auth/login-with-google.usecase';
import { ConfirmEmailUseCase } from '../../core/use-cases/auth/confirm-email.usecase';

import { AuthRepositoryImpl } from '../database/repositories/auth.repository';
import { UserModel, UserSchema } from '../database/models/user.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthResolver } from './resolvers/auth.resolvers';
import { HelloResolver } from './resolvers/hello-world.resolvers';
import { ServicesModule } from '../services/services.module'; // 🔥 IMPORTANTE
import { RequestPasswordResetUseCase } from 'src/core/use-cases/auth/request-password-reset.usecase';
import { ResetPasswordUseCase } from 'src/core/use-cases/auth/reset-password.usecase';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true,
        }),
        MongooseModule.forFeature([
            { name: UserModel.name, schema: UserSchema },
        ]),
        ServicesModule,
    ],
    providers: [
        AuthResolver,
        RegisterUserUseCase,
        LoginUserUseCase,
        LoginWithGoogleUseCase,
        ConfirmEmailUseCase,
        RequestPasswordResetUseCase,
        ResetPasswordUseCase,
        HelloResolver,
        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryImpl,
        },
    ],
})
export class GraphqlInfraModule { }