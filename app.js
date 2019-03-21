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

    var friends = users[4].friends;
    var friendsOfFriendIDarrays = [];
    var friendsOfFriendCompleteID = [];
    var names = [];

    for (i in friends) {
        friendsOfFriendIDarrays.push(users[friends[i] - 1].friends);
    }

    for (i in friendsOfFriendIDarrays) {
        for (j in friendsOfFriendIDarrays[i]) {
            friendsOfFriendCompleteID.push(friendsOfFriendIDarrays[i][j]);
        }
    }


    for (i in friendsOfFriendCompleteID) {
        names.push(users[friendsOfFriendCompleteID[i] - 1].firstName + "  " + users[friendsOfFriendCompleteID[i] - 1].surname);
    }


    res.render('friends-of-friends', { users: users, names: names });

});



app.listen(3131, function () {
    console.log('Server started on port 3131...');
})