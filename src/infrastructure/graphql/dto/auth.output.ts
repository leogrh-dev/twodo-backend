import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthOutput {
  @Field()
  id: string;

  @Field()
  email: string;
}

@ObjectType()
export class AuthTokenOutput {
  @Field()
  accessToken: string;
}