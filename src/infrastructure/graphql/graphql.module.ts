import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RegisterUserUseCase } from '../../core/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from '../../core/use-cases/auth/login-user.usecase';
import { AuthRepositoryImpl } from '../database/repositories/auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../database/models/user.schema';
import { AuthResolver } from './resolvers/auth.resolvers';
import { HelloResolver } from './resolvers/hello-world.resolvers';
import { LoginWithGoogleUseCase } from 'src/core/use-cases/auth/login-with-google.usecase';

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
    ],
    providers: [
        AuthResolver,
        RegisterUserUseCase,
        LoginUserUseCase,
        LoginWithGoogleUseCase,
        HelloResolver,
        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryImpl,
        },
    ],
})
export class GraphqlInfraModule { }
