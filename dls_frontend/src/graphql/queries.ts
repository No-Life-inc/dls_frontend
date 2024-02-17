import { gql } from '@apollo/client';

export const GETALLSTORIES = gql`
  query {
    getAllStories {
      id
      title
      bodyText
      imgUrl
    }
  }
`;