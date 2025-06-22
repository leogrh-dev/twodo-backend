import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GoogleLoginInput, LoginInput, RegisterInput } from '../dto/auth.input';
import { AuthOutput, AuthTokenOutput } from '../dto/auth.output';
import { RegisterUserUseCase } from '../../../core/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from 'src/core/use-cases/auth/login-user.usecase';
import { LoginWithGoogleUseCase } from 'src/core/use-cases/auth/login-with-google.usecase';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly loginWithGoogleUseCase: LoginWithGoogleUseCase,
    ) { }

    @Mutation(() => AuthOutput)
    async userRegister(
        @Args('input') input: RegisterInput,
    ): Promise<AuthOutput> {
        const user = await this.registerUserUseCase.execute(input.email, input.password);
        return {
            id: user.id,
            email: user.email,
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
}