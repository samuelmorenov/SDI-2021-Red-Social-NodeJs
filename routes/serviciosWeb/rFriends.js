module.exports = function (app, gestorBD) {

    app.get("/api/friends/", function(req, res) {

        let userEmail = res.usuario;
        let criterio = {
            $or:
                [
                    {usuario1Email: userEmail},
                    {usuario2Email: userEmail},
                ]
        };

        gestorBD.obtenerLista('amistades', criterio, function (amistades) {

            if (amistades == null) {
                res.status(500);
                res.json({
                    error: "Error: No se ha podido obtener la lista de amistades"
                });
            } else {
                let amigos = [];
                for (let i = 0; i < amistades.length; i++) {
                    if (amistades[i].usuario1Email != userEmail) {
                        amigos.push(amistades[i].usuario1Email);
                    } else if (amistades[i].usuario2Email != userEmail) {
                        amigos.push(amistades[i].usuario2Email);
                    }
                }
                criterio = {email: {$in: amigos}};
                gestorBD.obtenerLista('usuarios', criterio, function (usuarios, total) {

                    if (usuarios == null) {
                        res.status(500);
                        res.json({
                            error: "Error: No se ha podido obtener la lista de amistades"
                        });
                    } else {
                        res.status(200);
                        res.send(JSON.stringify(usuarios));
                    }
                });
            }
        });
    });

}