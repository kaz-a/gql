import React, { Component } from 'react';
// import { gql } from 'apollo-boost'; // parse graphql queries
import { graphql, compose } from 'react-apollo'; // bind react to apollo
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

// // queries template string
// const getAuthorsQuery = gql`
//   {
//     authors{
//       name
//       id
//     }
//   }
// `
class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }
  displayAuthors(){
    // var data = this.props.data;
    // since we bound 2 queries (getAuthorsQuery and addBookMutation), we can't use this.props.data.
    // instead, we ust use this.props.getAuthorsQuery
    var data = this.props.getAuthorsQuery;

    if(data.loading){
      return (<option disabled>Loading authors...</option>)
    } else {
      return data.authors.map(author => {
        return (
          <option key={ author.id } value={ author.id }>{ author.name }</option>
        )
      })
    }
  }

  submitForm(e){
    // remove the default behavior of page refresh
    e.preventDefault();
    
    // mutation to the graphQL server
    this.props.addBookMutation();
  }

  render() {
    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) } >
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={ (e) => this.setState({ genre: e.target.value })} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={ (e) => this.setState({ authorId: e.target.value }) } >
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
        
      </form>
    );
  }
}

// export default graphql(getAuthorsQuery)(AddBook);
// instead of binding 2 queries like `graphql(getAuthorsQuery)(addBookMutation)(AddBook)`, 
// bind the 2 queries to one component by using `compose`: 
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);

