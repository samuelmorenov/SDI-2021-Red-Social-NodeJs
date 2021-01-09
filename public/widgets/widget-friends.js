window.history.pushState("", "", "/cliente.html?w=friends");

this.loadFriends();

function loadFriends() {
    //var token = Cookies.get('token');

    $.ajax({
        url: URLbase + "/friends",
        type: "GET",
        data: { },
        dataType: 'json',
        headers: { "token": token },
        success: function(respuesta) {
            friends = respuesta;
            friendsTable(friends);
        },
        error : function (error) {
            $( "#contenedor-principal" ).load("widgets/" + "widget-login.html");
        }
    });
}

function friendsTable(friends) {
    $( "#tbody-friends" ).empty();
    for (let i = 0; i < friends.length; i++) {
        $( "#tbody-friends" ).append(
            "<tr id="+friends[i].email+">"+
            "<td>"+friends[i].name+"</td>" +
            "<td>"+friends[i].lastName+"</td>" +
            "<td>"+friends[i].email+"</td>" +
            "</tr>"
        );
    }
}

