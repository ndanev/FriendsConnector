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

function twoOrMoreCommonFriends(user1, user2) {

    var counter = 0;
    for (var i = 0; i < user1.friends.length; i++) {
        
        if (user2.friends.includes(user1.friends[i])) {
            counter++;   
        }
    }

    if (counter > 1) {
        return true;
    } else {
        return false;
    }
}

function friends(userID) {

    var user = findUserById(userID);

    var friends = user.friends;
    var friendList = [];

    for (var i = 0; i < friends.length; i++) {

        var u = findUserById(friends[i]);

        friendList.push(u);

    }
    return friendList;
}

function friendsOfFriends(userID) {

    var user = findUserById(userID);
    var friends = user.friends;
    var friendsOfFriends = [];

    for (var i = 0; i < friends.length; i++) {

        var u = findUserById(friends[i]);

        for (j = 0; j < u.friends.length; j++) {

            var m = findUserById(u.friends[j]);

            if (!userExistsInList(m.id, friendsOfFriends )) {

                friendsOfFriends.push(m);
            }

        }
    }
    return friendsOfFriends;
}

function suggestedFriends(userID) {

    var user = findUserById(userID);
    var suggestedFriends = [];
    
    
    for (var i = 0; i < users.length; i++) {

        var u = findUserById(users[i].id);

        if ( u.id != userID && !user.friends.includes(u.id) && twoOrMoreCommonFriends(user, u)) {

            suggestedFriends.push(u);

        }
        
    }
    return suggestedFriends;
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

    var userID = req.params.id;

    var user = findUserById(userID);

    var f = friends(userID);

    res.render('friends', { user: user, friendList: f });

});



// ======================= //
// SHOW FRIENDS OF FRIENDS
// ======================= //

app.get('/friends-of-friends/:id', function (req, res) {

    var userID = req.params.id;

    var user = findUserById(userID);

    var ff = friendsOfFriends(userID);


    res.render('friends-of-friends', { user: user, friendsOfFriends: ff });

});


// ======================== //
// SHOW SUGGENSTED OF FRIENDS
// ======================== //

app.get('/suggested-friends/:id', function(req, res) {
    
    var userID = req.params.id;

    var user = findUserById(userID);

    var sf = suggestedFriends(userID);


    res.render('suggested-friends', {user: user, suggestedFriends: sf });

});



app.listen(3131, function () {
    console.log('Server started on port 3131...');
})