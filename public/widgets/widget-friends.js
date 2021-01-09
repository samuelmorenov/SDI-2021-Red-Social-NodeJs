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
            "<td>" +
                "<button type='submit' className='btn btn-default' " +
                "id='button-chat-" + friends[i].email + "' "+
                "onclick=chat('" + friends[i].email + "')" +
                ">" + "✉</button>" +
            "</td>" +
            "</tr>"
        );
    }
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

function chat(friendEmail) {
    $("#contenedor-principal").load("widgets/widget-chat.html");
}