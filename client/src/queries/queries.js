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

// query for single book by id (for BookDetails)
const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`


export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };