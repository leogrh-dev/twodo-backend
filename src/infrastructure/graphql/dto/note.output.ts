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

    @Field(() => String, { nullable: true })
    bannerUrl?: string | null;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field()
    isDeleted: boolean;

    @Field()
    isFavorite: boolean;

    @Field(() => String, { nullable: true })
    iconUrl?: string | null;

    @Field(() => [String])
    attachedFiles: string[];
}