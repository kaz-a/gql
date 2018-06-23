const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Book = require('../models/book'),
  Author = require('../models/author');

// // dummy data for now
// var books = [
// 	{ name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
// 	{ name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
// 	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
// 	{ name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
// 	{ name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
// 	{ name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
// 	{ name: 'Patrick Rothfuss', age: 44, id: '1' },
// 	{ name: 'Brandon Sanderson', age: 42, id: '2' },
// 	{ name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: { 
			type: AuthorType,
			resolve(parent, args){
				// // console.log(parent); // logs parent object - books object
				// return _.find(authors, { id: parent.authorId });
			}
		}		
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType), // BookType would be one book. we need a list of books!
			resolve(parent, args){
				// return _.filter(books, { authorId: parent.id })
			}
		}
	})
});

// how we initially jump into a graph
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		// query for a book by id
		book: {
			type: BookType,
			args: { id: { type: GraphQLID }}, // book(id: '123){ name, genre }
			resolve(parent, args){ // get data from db/other source (ie. args.id)
				// return _.find(books, {id: args.id});
			}
		},
		// query for an author by id
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args){
				// return _.find(authors, { id: args.id });
			}
		},
		// query for all books
		books: {
			type: new GraphQLList(BookType), // list of books
			resolve(parent, args){
				// return books;
			}
		},
		// query for all authors
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args){
				// return authors;
			}
		}
	}
});

// user can perform mutations - add, delete, etc.
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      }, 
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    }
  }
})

// create schema and specifying which query to allow user
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});