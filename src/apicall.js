import { gql } from "apollo-boost";
export const USERS = gql`
{
    users{
      id
      email
    }
  }
`;

export const USER = gql`
query user($id: ID!){
    user(id: $id){
        id
        firstName
        lastName
        email
        school
        courses{
            name
            code
          }
    }
}
`;

export const FINDMATCH = gql`
query findMatches($id: ID!){
    findMatches(id: $id) {
      id
      firstName
      lastName
      email
      courses{
        id
        name
        code
      }
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
      courses{
        id
      }
    }
  }
`;