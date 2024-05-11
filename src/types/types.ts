/**
 * Represents a story object with its properties.
 */
export type Story={
    _id: string,
    storyGuid: string,
    storyInfo: StoryInfo,
    comments: Comment[],
    reactions: Reaction[],
    user: User,
}

export type StoryInfo={
    bodyText: string,
    createdAt: string,
    imgUrl: string,
    title: string,
}

export type Comment={
    _id: string,
    commentGuid: string,
    commentInfo: CommentInfo,
    createdAt: string,
    user: User
}

export type CommentInfo={
    bodyText: string,
    createdAt: string,
}

export type Reaction={
    _id: string,
    reactionType: ReactionType,
}

export type ReactionType={
    reactionTypeImg: string,
    reactionTypeName: string,
}

export type User={
    userGuid: string,
    firstName: string,
    lastName: string,
    email: string,
    userIndo: UserInfo,
}

export type UserInfo={
    firstName: string,
    lastName: string,
    imgUrl: string,
    email: string,
}

export type UserInput={
    username: string,
    email: string,
    password: string,
}

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }

export interface CreateStoryDTO {
        storyGuid: string;
        createdAt: string;
        storyInfo: {
            title: string;
            bodyText: string;
        };
        image: string; // Add missing type definition for base64data
        fileType: string; 
}
