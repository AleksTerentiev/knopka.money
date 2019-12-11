import gql from 'graphql-tag';

export interface Account {
  id: number;
  displayName: string;
  picture: string;
}

export interface AccountData {
  account: Account;
}

export const GET_ACCOUNT = gql`
  query Account {
    account {
      id
      displayName
      picture
    }
  }
`;
