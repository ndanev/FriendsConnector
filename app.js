const express = require('express');
var data = require('./data.json');

var users = data;

const app = express();

// setup template engine
app.set('view engine', 'ejs');

// setup static files
app.use(express.static(__dirname + '/public'));


function findUserById(id) {

    for (var i = 0; i < users.length; i++) {

        if (users[i].id == id) {
            return users[i];
        }
    }

}

function userExistsInList (id, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            return true;
        }
    } 
    return false;
}


// ============== //
// SHOW ALL USERS //
// ============== //

app.get('/users', function (req, res) {

    res.render('users', { users: users });

});



// =================== //
// SHOW DIRECT FRIENDS
// =================== //

app.get('/show-friends/:id', function (req, res) {

    userID = req.params.id;
    user = findUserById(userID);

    var friends = user.friends;
    var friendList = [];

    for (var i = 0; i < friends.length; i++) {

        var u = findUserById(friends[i]);

        friendList.push(u);

    }

    res.render('friends', { user: user, friendList: friendList });

});



// ======================= //
// SHOW FRIENDS OF FRIENDS
// ======================= //

app.get('/friends-of-friends/:id', function (req, res) {

    userID = req.params.id;
    user = findUserById(userID);
    var friends = user.friends;
    var friendsOfFriends = [];

    for (var i = 0; i < friends.length; i++) {

        u = findUserById(friends[i]);

        for (j = 0; j < u.friends.length; j++) {

            m = findUserById(u.friends[j]);

            if (!userExistsInList(m.id, friendsOfFriends )) {

                friendsOfFriends.push(m);
            }

        }
    }

    res.render('friends-of-friends', { user: user, friendsOfFriends: friendsOfFriends });

});



app.listen(3131, function () {
    console.log('Server started on port 3131...');
})