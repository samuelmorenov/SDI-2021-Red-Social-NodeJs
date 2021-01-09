window.history.pushState("", "", "/cliente.html?w=chat");

this.loadChat();

function loadChat() {
    $("#h2-tittle").empty();
    $("#h2-tittle").append("Chat con " + friend.name + " " + friend.lastname);

    $.ajax({
        url: URLbase + "/chats/list",
        type: "POST",
        data: {
            user: user,
            email: friend.email
        },
        dataType: 'json',
        success: function (respuesta) {
            if(respuesta == null || respuesta.length == 0){
                $("#tbody-chat").empty();
            }else{
                messages = respuesta;
                tableChat(messages);
            }
        },
        error: function (error) {
            $("#tbody-chat").empty();
        }
    });
};

function tableChat(messages) {
    $("#tbody-chat").empty();
    let usuario = user;
    for (let i = 0; i < messages.length; i++) {
        let emisor = messages[i].emisor;
        let texto = messages[i].text;
        let fila = "";
        if (emisor == usuario) {
            fila = "<td align=\"right\" style=\"background-color:#dcf8c6\">" + texto + "</td>";
        } else {
            fila = "<td>" + texto + "</td>";
        }
        $("#tbody-chat").append("<tr>" + fila + "</tr>");
    }
}

$('#button-chat').click(function () {
    var inputChat = $("#input-chat").val();
    if (inputChat == null || inputChat == "") {
        return;
    }
    var emailEmisor = user;
    var emailReceptor = friend.email;

    $.ajax({
        url: URLbase + "/chats/add",
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