import { useSuspenseQuery } from '@apollo/client';
import gql from 'graphql-tag';

export interface User {
  _id: string;
  displayName: string;
  picture: string;
  email: string;
}

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      displayName
      picture
      email
    }
  }
`;

export const getUserByEmail = () => {
  const { data } = useSuspenseQuery(GET_USER_BY_EMAIL) as {
    data: { userByEmail: User };
  };

  return data.userByEmail;
};
