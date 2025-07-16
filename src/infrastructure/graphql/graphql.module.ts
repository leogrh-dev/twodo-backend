import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { UserModel, UserSchema } from '../database/models/user.schema';
import { Note, NoteSchema } from '../database/models/note.schema';

import { AuthRepositoryImpl } from '../database/repositories/auth.repository';
import { NoteRepositoryImpl } from '../database/repositories/note.repository';

import { NoteRepository } from 'src/application/interfaces/note-repository.interface';

import { RegisterUserUseCase } from '../../core/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from '../../core/use-cases/auth/login-user.usecase';
import { LoginWithGoogleUseCase } from '../../core/use-cases/auth/login-with-google.usecase';
import { ConfirmEmailUseCase } from '../../core/use-cases/auth/confirm-email.usecase';
import { ResendEmailConfirmationUseCase } from 'src/core/use-cases/auth/resend-email-confirmation.usecase';
import { RequestPasswordResetUseCase } from 'src/core/use-cases/auth/request-password-reset.usecase';
import { ResetPasswordUseCase } from 'src/core/use-cases/auth/reset-password.usecase';
import { UpdateUserIconUseCase } from 'src/core/use-cases/auth/update-user-icon.usecase';
import { RemoveUserIconUseCase } from 'src/core/use-cases/auth/remove-user-icon.usecase';

import { CreateNoteUseCase } from 'src/core/use-cases/note/create-note.usecase';
import { FindNotesByOwnerUseCase } from 'src/core/use-cases/note/find-notes-by-owner.usecase';
import { FindNoteByIdUseCase } from 'src/core/use-cases/note/find-note-by-id.usecase';
import { UpdateNoteTitleUseCase } from 'src/core/use-cases/note/update-note-title.usecase';
import { UpdateNoteContentUseCase } from 'src/core/use-cases/note/update-note-content.usecase';
import { UpdateNoteBannerUseCase } from 'src/core/use-cases/note/update-note-banner.usecase';
import { RemoveNoteBannerUseCase } from 'src/core/use-cases/note/remove-note-banner.usecase';
import { DeleteNoteUseCase } from 'src/core/use-cases/note/delete-note.usecase';
import { GetDeletedNotesUseCase } from 'src/core/use-cases/note/get-deleted-notes.usecase';
import { RestoreNoteUseCase } from 'src/core/use-cases/note/restore-note.usecase';
import { PermanentlyDeleteNoteUseCase } from 'src/core/use-cases/note/permanently-delete-note.usecase';
import { ToggleFavoriteNoteUseCase } from 'src/core/use-cases/note/toggle-favorite-note.usecase';

import { AuthResolver } from './resolvers/auth.resolvers';
import { NoteResolver } from './resolvers/note.resolvers';

import { ServicesModule } from '../services/services.module';
import { UploadModule } from '../upload/upload.module';
import { UpdateNoteIconUseCase } from 'src/core/use-cases/note/update-note-icon.usecase';
import { RemoveNoteIconUseCase } from 'src/core/use-cases/note/remove-note-icon.usecase';
import { GetCurrentUserUseCase } from 'src/core/use-cases/auth/get-current-user.usecase';
import { VerifyPasswordUseCase } from 'src/core/use-cases/auth/verify-password.usecase';
import { UpdatePasswordUseCase } from 'src/core/use-cases/auth/update-password.usecase';
import { UpdateUserNameUseCase } from 'src/core/use-cases/auth/update-user-name.usecase';
import { DeleteUserUseCase } from 'src/core/use-cases/auth/delete-user.usecase';

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
        UploadModule,
    ],
    providers: [
        AuthResolver,
        NoteResolver,

        GetCurrentUserUseCase,
        RegisterUserUseCase,
        LoginUserUseCase,
        LoginWithGoogleUseCase,
        ConfirmEmailUseCase,
        ResendEmailConfirmationUseCase,
        RequestPasswordResetUseCase,
        ResetPasswordUseCase,
        UpdateUserIconUseCase,
        RemoveUserIconUseCase,
        VerifyPasswordUseCase,
        UpdatePasswordUseCase,
        UpdateUserNameUseCase,
        DeleteUserUseCase,

        CreateNoteUseCase,
        FindNotesByOwnerUseCase,
        FindNoteByIdUseCase,
        UpdateNoteTitleUseCase,
        UpdateNoteContentUseCase,
        UpdateNoteBannerUseCase,
        RemoveNoteBannerUseCase,
        UpdateNoteIconUseCase,
        RemoveNoteIconUseCase,
        DeleteNoteUseCase,
        GetDeletedNotesUseCase,
        RestoreNoteUseCase,
        PermanentlyDeleteNoteUseCase,
        ToggleFavoriteNoteUseCase,

        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryImpl,
        },
        {
            provide: NoteRepository,
            useClass: NoteRepositoryImpl,
        },
    ],
})
export class GraphqlInfraModule { }