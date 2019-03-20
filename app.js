const express = require('express');
var data = require('./data.json');

var users = data;

const app = express();

// setup template engine
app.set('view engine', 'ejs');

// setup static files
app.use(express.static(__dirname + '/public'));


app.get('/users', function(req, res) {

    // var users = JSON.stringify(data);

    // res.header("Content-Type",'application/json');


    res.render('users', { users: users});

});

app.get('/show_friends/:id', function(req, res) {

    var friends = users[4].friends;

    console.log(friends);


    res.render('friends', {users: users});

});

app.listen(3131, function() {
    console.log('Server started on port 3131...');
})