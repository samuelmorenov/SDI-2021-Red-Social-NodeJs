window.history.pushState("", "", "/cliente.html?w=login");
$('#boton-login').click(function () {
    $.ajax({
        url: URLbase + "/autenticar",
        type: "POST",
        data: {
            email: $("#email").val(),
            password: $("#password").val()
        },
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta.token);
            token = respuesta.token;
            Cookies.set('token', respuesta.token);
            $("#contenedor-principal").load("widgets/widget-friends.html");
        },
        error: function (error) {
            Cookies.set('token', respuesta.token);
            $("#widget-login")
                .prepend("<div class='alert alert-danger'>La combinacion usuario-contraseña es incorrecta.</div>");
        }
    });
});