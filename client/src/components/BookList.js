import React, { Component } from 'react';
import { gql } from 'apollo-boost'; // parse graphql queries
import { graphql } from 'react-apollo'; // bind react to apollo

// queries template string
const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

class BookList extends Component {
  displayBooks(){
    var data = this.props.data;
    if(data.loading){
      return (
        <div>Loading books...</div>
      )
    } else {
      return data.books.map(book => {
        return (
          <li key={ book.id }>{ book.name }</li>
        )
      })
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
      </div>
    );
  }
}

// take getBooksQuery and bind it to the BookList component
// we have acess to all the data that comes back from the query
// and stored in the component props
export default graphql(getBooksQuery)(BookList);
