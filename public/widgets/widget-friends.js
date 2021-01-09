window.history.pushState("", "", "/cliente.html?w=friends");

var friends;

this.loadFriends();

function loadFriends() {
    $.ajax({
        url: URLbase + "/friends",
        type: "GET",
        data: {},
        dataType: 'json',
        headers: {"token": token},
        success: function (respuesta) {
            friends = respuesta;
            friendsTable(friends);
        },
        error: function (error) {
            $("#contenedor-principal").load("widgets/" + "widget-login.html");
        }
    });
}

function friendsTable(friends) {
    $("#tbody-friends").empty();
    for (let i = 0; i < friends.length; i++) {
        $("#tbody-friends").append(
            "<tr id=" + friends[i].email + ">" +
            "<td>" + friends[i].name + "</td>" +
            "<td>" + friends[i].lastName + "</td>" +
            "<td>" + friends[i].email + "</td>" +
            "<td>" + this.createButton(friends[i]) + "</td>" +
            "</tr>"
        )
        ;
    }
}

function createButton(friend) {
    var email = friend.email;
    var name = friend.name;
    var lastName = friend.lastName;
    var parametros = "\'" + email + "\'" + "," + "\'" + name + "\'" + "," + "\'" + lastName + "\'";
    var button =
        "<button type='submit' className='btn btn-default' " +
        "id='button-chat-" + email + "' " +
        "onclick=chat(" + parametros + ")>" +
        "✉</button>";
    return button;
}

$('#button-buscar').click(function () {
    var friendsFiltereds = [];
    var inputName = $("#input-buscar").val();

    for (i = 0; i < friends.length; i++) {
        if (friends[i].name.includes(inputName)) {
            friendsFiltereds.push(friends[i]);
        }
    }
    friendsTable(friendsFiltereds);
});

function chat(friendEmail, friendName, friendLastName) {
    friend = {
        email : friendEmail,
        name : friendName,
        lastname : friendLastName
    };
    $("#contenedor-principal").load("widgets/widget-chat.html");
}