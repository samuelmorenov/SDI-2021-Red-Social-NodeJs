window.history.pushState("", "", "/cliente.html?w=chat");

this.loadChat();

function loadChat() {
    $("#h2-tittle").empty();
    $("#h2-tittle").append("Chat con " + friend.name + " " + friend.lastname);

};

$('#button-chat').click(function () {
    var inputChat = $("#input-chat").val();
    if(inputChat == null || inputChat == ""){
        return;
    }
    var emailEmisor = user;
    var emailReceptor = friend.email;

    $.ajax({
        url: URLbase + "/chats",
        type: "POST",
        data: {
            text: inputChat,
            emisor: emailEmisor,
            receptor: emailReceptor
        },
        dataType: 'json',
        success: function (respuesta) {
            $("#contenedor-principal").load("widgets/widget-chat.html");
        },
        error: function (error) {
            Cookies.remove('token');
            $("#widget-login")
                .prepend("<div class='alert alert-danger'>Error de envio.</div>");
        }
    });
});