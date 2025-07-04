import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}


@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class GoogleLoginInput {
  @Field()
  idToken: string;
}

@InputType()
export class ResendConfirmationEmailInput {
  @Field()
  email: string;
}
