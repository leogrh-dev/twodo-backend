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
import { ResendEmailConfirmationUseCase } from 'src/core/use-cases/auth/resend-email-confirmation.usecase';
import { NoteRepositoryImpl } from '../database/repositories/note.repository';
import { CreateNoteUseCase } from 'src/core/use-cases/note/create-note.usecase';
import { NoteResolver } from './resolvers/note.resolvers';
import { Note, NoteSchema } from '../database/models/note.schema';
import { FindNotesByOwnerUseCase } from 'src/core/use-cases/note/find-notes-by-owner.usecase';
import { FindNoteByIdUseCase } from 'src/core/use-cases/note/find-note-by-id.usecase';
import { NoteRepository } from 'src/application/interfaces/note-repository.interface';
import { UpdateNoteTitleUseCase } from 'src/core/use-cases/note/update-note-title.usecase';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true,
            context: ({ req }) => ({ req }),
        }),
        MongooseModule.forFeature([
            { name: UserModel.name, schema: UserSchema },
            { name: Note.name, schema: NoteSchema },
        ]),
        ServicesModule,
    ],
    providers: [
        AuthResolver,
        RegisterUserUseCase,
        LoginUserUseCase,
        LoginWithGoogleUseCase,
        ConfirmEmailUseCase,
        ResendEmailConfirmationUseCase,
        RequestPasswordResetUseCase,
        ResetPasswordUseCase,
        HelloResolver,
        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryImpl,
        },
        NoteResolver,
        CreateNoteUseCase,
        UpdateNoteTitleUseCase,
        FindNotesByOwnerUseCase,
        FindNoteByIdUseCase,
        {
            provide: NoteRepository,
            useClass: NoteRepositoryImpl,
        },
    ],
})
export class GraphqlInfraModule { }