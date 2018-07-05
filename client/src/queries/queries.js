import { gql } from 'apollo-boost';

// queries template string
const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`
const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`
export { getAuthorsQuery, getBooksQuery };