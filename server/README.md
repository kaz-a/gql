## start the GraphQL server
1. `cd server`
2. `npm install`
3. `nodemon app`
4. log in to mlab

## Database
### go to `localhost:4000/graphql`
* Add data using `mutation`:
```javascript
mutation {
  addBook(name:"Name of the Wind", genre:"Fantasy", authorId:"5b315dd2cdff4d4cdc9abbae"){
    name
    genre
    author{
      name
      age
    }
  }
}

// `GraphQLNonNull` will throw an error if the NonNull is set in schema:
mutation{
  addAuthor(name: John){
    name
  }
}
```

* Query for author:
```javascript
{
  author(id:"5b315dd2cdff4d4cdc9abbae"){
    name
    age
		books{
      name
      genre
    }
  }
}
```

* Query for books:
```javascript
{
  books{
    name
    genre
    author{
      name
      age
    }
  }
}
```





