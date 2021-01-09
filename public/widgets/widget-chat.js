window.history.pushState("", "", "/cliente.html?w=chat");

this.loadChat();

function loadChat() {
    $("#h2-tittle").empty();
    $("#h2-tittle").append("Chat con "+friend.name+" "+friend.lastname);

};