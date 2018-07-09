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

// mutation that passes 3 parameters (! after type means nonNull)
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){ 
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  } 
`


export { getAuthorsQuery, getBooksQuery, addBookMutation };