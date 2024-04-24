import { gql } from '@apollo/client';

/***
 *  This query retrieves all stories from the database.
 */
export const GETALLSTORIES = gql`
 {
  _id
  storyInfo {
    bodyText
    createdAt
    imgUrl
  }
  comments {
    commentInfo {
      bodyText
      createdAt
    }
    createdAt
  }
  reactions {
    reactionType {
      reactionTypeImg
      reactionTypeName
    }
  }
}

`;