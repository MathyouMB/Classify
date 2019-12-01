import { gql } from "apollo-boost";
export const USERS = gql`
{
    users{
      id
      email
    }
  }
`;
export const LOGIN = gql`
query login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;