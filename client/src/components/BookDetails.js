import React, { Component } from 'react';
import { graphql } from 'react-apollo'; // bind react to apollo
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
  displayBookDetails(){
    const { book } = this.props.data;
    if(book){
      return(
        <div>
          <h2>{ book.name }</h2>
          <p>{ book.genre }</p>
          <p>{ book.author.name }</p>
          <p>All books by this author:</p>
          <ul className="other-books">
          {
            book.author.books.map(item => {
              return (
                <li key={ item.id }>{ item.name }</li>
              )
            })
          }
          </ul>
        </div>
      )
    } else {
      return (
        <div>No book selected...</div>
      )
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div id="book-details">
      { this.displayBookDetails() }
      </div>
    );
  }
}

// taking the id of the selected book, passing it as a prop, 
// then using that id on the props as the query variable so it attaches itself to the query
// grabbing that book, returning it to us
export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
