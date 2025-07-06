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

@InputType()
export class UpdateNoteContentInput {
  @Field()
  id: string;

  @Field()
  content: string;
}

@InputType()
export class UpdateNoteBannerInput {
  @Field()
  id: string;

  @Field()
  bannerUrl: string;
}

@InputType()
export class RemoveNoteBannerInput {
  @Field()
  id: string;
}