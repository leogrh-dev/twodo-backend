import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {

}

@InputType()
export class UpdateNoteTitleInput {
  @Field()
  id: string;

  @Field()
  title: string;
}