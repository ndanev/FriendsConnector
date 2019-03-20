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
    var friendList = [];

    // console.log(friends);

    for (i in friends) {

        friendList.push(users[friends[i]-1].firstName + " " + users[friends[i]-1].surname);

    }

    res.render('friends', {users: users, friendList: friendList});

});

app.listen(3131, function() {
    console.log('Server started on port 3131...');
})