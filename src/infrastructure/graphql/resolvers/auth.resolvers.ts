import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GoogleLoginInput, LoginInput, RegisterInput, ResendConfirmationEmailInput, UpdatePasswordInput, UpdateUserIconInput, VerifyPasswordInput } from '../dto/auth.input';
import { AuthOutput, AuthTokenOutput } from '../dto/auth.output';
import { RegisterUserUseCase } from '../../../core/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from 'src/core/use-cases/auth/login-user.usecase';
import { LoginWithGoogleUseCase } from 'src/core/use-cases/auth/login-with-google.usecase';
import { ConfirmEmailUseCase } from '../../../core/use-cases/auth/confirm-email.usecase';
import { ResetPasswordInput } from '../dto/reset-password.input';
import { ForgotPasswordInput } from '../dto/forgot-password.input';
import { RequestPasswordResetUseCase } from 'src/core/use-cases/auth/request-password-reset.usecase';
import { ResetPasswordUseCase } from 'src/core/use-cases/auth/reset-password.usecase';
import { ResendEmailConfirmationUseCase } from 'src/core/use-cases/auth/resend-email-confirmation.usecase';
import { GetCurrentUserUseCase } from 'src/core/use-cases/auth/get-current-user.usecase';
import { VerifyPasswordUseCase } from 'src/core/use-cases/auth/verify-password.usecase';
import { UpdatePasswordUseCase } from 'src/core/use-cases/auth/update-password.usecase';
import { RemoveUserIconUseCase } from 'src/core/use-cases/auth/remove-user-icon.usecase';
import { UpdateUserIconUseCase } from 'src/core/use-cases/auth/update-user-icon.usecase';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly loginWithGoogleUseCase: LoginWithGoogleUseCase,
        private readonly confirmEmailUseCase: ConfirmEmailUseCase,
        private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
        private readonly resendEmailConfirmationUseCase: ResendEmailConfirmationUseCase,
        private readonly updateUserIconUseCase: UpdateUserIconUseCase,
        private readonly removeUserIconUseCase: RemoveUserIconUseCase,
        private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
        private readonly verifyPasswordUseCase: VerifyPasswordUseCase,
        private readonly updatePasswordUseCase: UpdatePasswordUseCase,
    ) { }

    @Mutation(() => AuthOutput)
    async userRegister(
        @Args('input') input: RegisterInput,
    ): Promise<AuthOutput> {
        const user = await this.registerUserUseCase.execute(
            input.name,
            input.email,
            input.phone,
            input.password,
        );
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        };
    }

    @Mutation(() => AuthTokenOutput)
    async userLogin(
        @Args('input') input: LoginInput,
    ): Promise<AuthTokenOutput> {
        const result = await this.loginUserUseCase.execute(input.email, input.password);
        return {
            accessToken: result.accessToken,
        };
    }

    @Mutation(() => AuthTokenOutput)
    async userLoginWithGoogle(
        @Args('input') input: GoogleLoginInput,
    ): Promise<AuthTokenOutput> {
        const result = await this.loginWithGoogleUseCase.execute(input.idToken);
        return {
            accessToken: result.accessToken,
        };
    }

    @Mutation(() => Boolean)
    async confirmEmail(
        @Args('token') token: string,
    ): Promise<boolean> {
        try {
            await this.confirmEmailUseCase.execute(token);
            return true;
        } catch (error) {
            console.error('Erro ao confirmar email:', error);
            return false;
        }
    }

    @Mutation(() => Boolean)
    async resendConfirmationEmail(
        @Args('input') input: ResendConfirmationEmailInput,
    ): Promise<boolean> {
        await this.resendEmailConfirmationUseCase.execute(input.email);
        return true;
    }

    @Mutation(() => Boolean)
    async forgotPassword(@Args('input') input: ForgotPasswordInput) {
        await this.requestPasswordResetUseCase.execute(input.email);
        return true;
    }

    @Mutation(() => Boolean)
    async resetPassword(@Args('input') input: ResetPasswordInput) {
        await this.resetPasswordUseCase.execute(input.token, input.newPassword);
        return true;
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async updateUserIcon(
        @CurrentUser() user: { userId: string },
        @Args('input') input: UpdateUserIconInput,
    ): Promise<boolean> {
        await this.updateUserIconUseCase.execute(user.userId, input.url);
        return true;
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async removeUserIcon(
        @CurrentUser() user: { userId: string },
        @Args('currentUrl') currentUrl: string,
    ): Promise<boolean> {
        await this.removeUserIconUseCase.execute(user.userId, currentUrl);
        return true;
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async verifyPassword(
        @CurrentUser() user: { userId: string },
        @Args('input') input: VerifyPasswordInput,
    ): Promise<boolean> {
        return this.verifyPasswordUseCase.execute(user.userId, input.password);
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async updatePassword(
        @CurrentUser() user: { userId: string },
        @Args('input') input: UpdatePasswordInput,
    ): Promise<boolean> {
        await this.updatePasswordUseCase.execute(user.userId, input.newPassword);
        return true;
    }

    @Query(() => AuthOutput)
    @UseGuards(AuthGuard)
    async getCurrentUser(
        @CurrentUser() user: { userId: string },
    ): Promise<AuthOutput> {
        const entity = await this.getCurrentUserUseCase.execute(user.userId);
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            phone: entity.phone,
            iconUrl: entity.iconUrl ?? null,
        };
    }
}