import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthOutput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;
}

@ObjectType()
export class AuthTokenOutput {
  @Field()
  accessToken: string;
}

@ObjectType()
export class ConfirmEmailOutput {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}