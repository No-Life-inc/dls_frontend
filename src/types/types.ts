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
    _id: string,
    userGuid: string,
    firstName: string,
    lastName: string,
    email: string,
}

export type UserInput={
    username: string,
    email: string,
    password: string,
}
