import { Query, Resolver } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class HelloResponse {
  @Field()
  message: string;
}

@Resolver()
export class HelloResolver {
  @Query(() => HelloResponse)
  sayHello(): HelloResponse {
    return { message: 'Hello from Twodo Backend 🚀' };
  }
}
