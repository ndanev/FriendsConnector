

function populateDirectFriends(userID) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            var friends = JSON.parse(xhttp.responseText);

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
    }
    xhttp.open('GET', '/users/' + userID + '/friends', true);
    xhttp.send();
}



function populateFriendsOfFriends(userID) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            var friendsOfFriends = JSON.parse(xhttp.responseText);

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
    }
    xhttp.open('GET', '/users/' + userID + '/friends-of-friends', true);
    xhttp.send();

}

function populateSuggestedFriends(userID) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            var suggestedFriends = JSON.parse(xhttp.responseText);

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
    }
    xhttp.open('GET', '/users/' + userID + '/suggested-friends', true);
    xhttp.send();

}



function populateUsers(userID) {

    populateDirectFriends(userID);

    populateFriendsOfFriends(userID);

    populateSuggestedFriends(userID);
}