import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GoogleLoginInput, LoginInput, RegisterInput } from '../dto/auth.input';
import { AuthOutput, AuthTokenOutput } from '../dto/auth.output';
import { RegisterUserUseCase } from '../../../core/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from 'src/core/use-cases/auth/login-user.usecase';
import { LoginWithGoogleUseCase } from 'src/core/use-cases/auth/login-with-google.usecase';
import { ConfirmEmailUseCase } from '../../../core/use-cases/auth/confirm-email.usecase';
import { ResetPasswordInput } from '../dto/reset-password.input';
import { ForgotPasswordInput } from '../dto/forgot-password.input';
import { RequestPasswordResetUseCase } from 'src/core/use-cases/auth/request-password-reset.usecase';
import { ResetPasswordUseCase } from 'src/core/use-cases/auth/reset-password.usecase';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly loginWithGoogleUseCase: LoginWithGoogleUseCase,
        private readonly confirmEmailUseCase: ConfirmEmailUseCase,
        private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
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
    async forgotPassword(@Args('input') input: ForgotPasswordInput) {
        await this.requestPasswordResetUseCase.execute(input.email);
        return true;
    }

    @Mutation(() => Boolean)
    async resetPassword(@Args('input') input: ResetPasswordInput) {
        await this.resetPasswordUseCase.execute(input.token, input.newPassword);
        return true;
    }
}