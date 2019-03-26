
// GET USER DATA

function getData(userID, url, callback) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var data = JSON.parse(xhttp.responseText);

            callback(data);

        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();

}

//DIRECT FRIENDS

function populateDirectFriends(userID) {

    getDirectFriends(userID, showDirectFriends);

}

function showDirectFriends(friends) {

    var output = '';

    for (i in friends) {
        output += `
        <ul>
            <li>
                <a href="/show-user/${friends[i].id}">
                    ${friends[i].firstName}
                        ${friends[i].surname}
                </a>
            </li>
        </ul>
        
        `
    }
    document.getElementById('direct-friends').innerHTML = output;
}


function getDirectFriends(userID, callback) {

    getData(userID, '/users/' + userID + '/friends', callback);


}



// FRIENDS OF FRIENDS

function populateFriendsOfFriends(userID) {

    getFriendsOfFriends(userID, showFriendsOfFriends);

}

function showFriendsOfFriends(friendsOfFriends) {

    var output = '';

    for (i in friendsOfFriends) {
        output += `
        <ul>
            <li>
                <a href="/show-user/${friendsOfFriends[i].id}">
                    ${friendsOfFriends[i].firstName}
                        ${friendsOfFriends[i].surname}
                </a>
            </li>
        </ul>
        
        `
    }
    document.getElementById('friends-of-friends').innerHTML = output;
}

function getFriendsOfFriends(userID, callback) {

    getData(userID, '/users/' + userID + '/friends-of-friends', callback);

}


// SUGGESTED FRIENDS

function populateSuggestedFriends(userID) {

    getSuggestedFriends(userID, showSuggestedFriends);

}

function showSuggestedFriends(suggestedFriends) {

    var output = '';

    for (i in suggestedFriends) {
        output += `
        <ul>
            <li>
                <a href="/show-user/${suggestedFriends[i].id}">
                    ${suggestedFriends[i].firstName}
                        ${suggestedFriends[i].surname}
                </a>
            </li>
        </ul>
        
        `
    }
    document.getElementById('suggested-friends').innerHTML = output;
}


function getSuggestedFriends(userID, callback) {

    getData(userID, '/users/' + userID + '/suggested-friends', callback);

} 


// POPULATE USERS

function populateUsers(userID) {

    populateDirectFriends(userID);

    populateFriendsOfFriends(userID);

    populateSuggestedFriends(userID);

}