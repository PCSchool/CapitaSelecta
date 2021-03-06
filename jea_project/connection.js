var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/JEA')

var connection = mongoose.connection;

connection.on('connected', function() {
    console.log('connected to db');
});

connection.on('disconnected', function(){
    console.log('disconnected to db');
});

connection.on('error', function(error){
    console.log('db connection error');
});

connection.on('SIGINT', function(){
    connection.close(function() {
        console.log('db connection closed');
        process.exit(0);
    })
})