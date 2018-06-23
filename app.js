const express = require('express'),
	app = express(),
	chalk = require('chalk'),
	graphqlHTTP = require('express-graphql'),
	schema = require('./schema/schema'),
	mongoose = require('mongoose'),
	port = 4000 || process.env.PORT;

// connect to mlab database
mongoose.connect("mongodb://kaz:1a2b3c4d@ds263710.mlab.com:63710/zakscloset");
mongoose.connection.once('open', () => {
	console.log('connected to database')
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true // use graphicl tool at /graphql 
	})
);

app.listen(port, () => {
  console.log(chalk.cyan(`app listening on port ${port}...`))
});