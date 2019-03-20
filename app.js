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



// =================== //
// SHOW DIRECT FRIENDS
// =================== //

app.get('/show_friends/:id', function(req, res) {

    var friends = users[4].friends;
    var friendList = [];

    // console.log(friends);

    for (i in friends) {

        friendList.push(users[friends[i]-1].firstName + " " + users[friends[i]-1].surname);

    }

    res.render('friends', {users: users, friendList: friendList});

});





// ======================= //
// SHOW FRIENDS OF FRIENDS
// ======================= //

app.get('/friends_of_friends/:id', function(req, res) {

    var friends = users[4].friends;
    var friendsOfFriendIDarrays = [];
    var friendsOfFriendCompleteID = [];
    var names = [];

    for (i in friends) {
        friendsOfFriendIDarrays.push(users[friends[i] -1].friends);
    }

    console.log(friendsOfFriendIDarrays);
    console.log("-----------");

    for (i in friendsOfFriendIDarrays) {
        for (j in friendsOfFriendIDarrays[i]) {
            friendsOfFriendCompleteID.push(friendsOfFriendIDarrays[i][j]);
        }
    }

    console.log(friendsOfFriendCompleteID);
    console.log("-----------");

    for (i in friendsOfFriendCompleteID) {
        names.push(users[friendsOfFriendCompleteID[i]-1].firstName +  "  "  + users[friendsOfFriendCompleteID[i]-1].surname);
    }


    console.log(names);
    console.log("-END-");
    
    res.render('friends-of-friends', {users: users, names: names});

});



app.listen(3131, function() {
    console.log('Server started on port 3131...');
})