// Run npm install mongodb and require mongodb and MongoClient class
  //express will create the server and mongodb will talk to the database
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

//server configuration 
const PORT = process.env.port || 4001;
const app = express();

//installing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// Runs the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});