import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello from Twodo!';
  }
}
