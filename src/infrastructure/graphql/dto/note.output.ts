import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NoteOutput {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    ownerId: string;

    @Field({ nullable: true })
    bannerUrl?: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}