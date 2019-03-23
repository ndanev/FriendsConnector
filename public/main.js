

function populateUsers(userID) {

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