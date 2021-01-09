module.exports = function (app, gestorBD) {

    app.post("/api/chats/", function (req, res) {

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

}