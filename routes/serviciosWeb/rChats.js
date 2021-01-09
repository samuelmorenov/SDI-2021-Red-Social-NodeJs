module.exports = function (app, gestorBD) {

    app.post("/api/chats/add", function (req, res) {

        let mensaje = {
            text: req.body.text,
            emisor: req.body.emisor,
            receptor: req.body.receptor
        }

        gestorBD.insertarChat(mensaje, function (id) {
            if (id == null) {
                res.status(401);
            } else {
                res.status(200);
                res.send(true);
            }
        });
    });

    app.post("/api/chats/list", function (req, res) {

        let userEmail = req.body.user;
        let friendEmail = req.body.email;

        let aux1 = { $and: [ {emisor : userEmail}, {receptor : friendEmail} ] };
        let aux2 = { $and: [ {emisor : friendEmail}, {receptor : userEmail} ] };
        let criterio = { $or: [ aux1, aux2 ] };

        gestorBD.obtenerLista('chats', criterio, function (mensajes, total) {

            if (mensajes == null) {
                res.status(500);
                res.json({
                    error: "Error: No se ha podido obtener la lista de amistades"
                });
            } else {
                res.status(200);
                res.send(JSON.stringify(mensajes));
            }
        });

    });

}