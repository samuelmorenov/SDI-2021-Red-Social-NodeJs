var token;
var URLbase = "https://localhost:8081/api";
var user = "";
var friend = {};
var messages = {};

$("#contenedor-principal").load("widgets/widget-login.html");

function widgetAmigos() {
    $("#contenedor-principal").load("widgets/widget-friends.html");
}
