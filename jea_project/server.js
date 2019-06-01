var express = require('express'),
  app = express(),
  cors = require('cors'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./models/TaskModel'),
  User = require('./models/UserModel'),
  Kweet = require('./models/KweetModel')
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/JEA'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./routes/UserRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);