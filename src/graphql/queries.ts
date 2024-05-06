import { gql } from '@apollo/client';

/***
 *  This query retrieves all stories from the database.
 */
export const GETALLSTORIES = gql`
query GetAllStories {
  getAllStories {
    _id
    createdAt
    storyGuid
    user {
      userInfo {
        email
        firstName
        lastName
      }
      userGuid
    }
    storyInfo {
      bodyText
      createdAt
      imgUrl
    }
    reactions {
      reactionType {
        reactionTypeImg
        reactionTypeName
      }
    }
    comments {
      commentInfo {
        bodyText
        createdAt
      }
      commentGuid
      user {
        userInfo {
          firstName
          email
          lastName
        }
        userGuid
      }
    }
  }
}
`;