module.exports = function (app, swig, gestorBD) {

    app.get("/friends", function (req, res) {
        let unitsPerPage = 100;

        let userMail = req.session.usuario;
        if (userMail == null) {
            res.redirect('/login');
            return;
        }

        let pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        let criterio = {
            $or:
                [
                    {usuario1Email: userMail},
                    {usuario2Email: userMail},
                ]
        };
        gestorBD.obtenerLista('amistades', criterio, function (amistades, total) {

            if (amistades == null) {
                req.session.error = "Error: No se ha podido obtener la lista de amistades";
                res.redirect('/error');
            } else {

                let amigos = [];
                for (let i = 0; i < amistades.length; i++) {
                    if (amistades[i].usuario1Email != userMail) {
                        amigos.push(amistades[i].usuario1Email);
                    } else if (amistades[i].usuario2Email != userMail) {
                        amigos.push(amistades[i].usuario2Email);
                    }
                }

                criterio = {email: {$in: amigos}};
                gestorBD.obtenerListaPaginada('usuarios', criterio, pg, unitsPerPage, function (usuarios, total) {

                    if (amistades == null) {
                        req.session.error = "Error: No se ha podido obtener la lista de amistades";
                        res.redirect('/error');
                    } else {
                        let ultimaPg = total / unitsPerPage;
                        if (total % unitsPerPage > 0) { // Sobran decimales
                            ultimaPg = ultimaPg + 1;
                        }
                        let paginas = []; // paginas mostrar
                        for (let i = pg - 2; i <= pg + 2; i++) {
                            if (i > 0 && i <= ultimaPg) {
                                paginas.push(i);
                            }
                        }

                        let respuesta = swig.renderFile('views/friends/list.html',
                            {
                                users: usuarios,
                                paginas: paginas,
                                actual: pg,
                                loggedUser: req.session.usuario != null
                            });
                        res.send(respuesta);
                    }
                });
            }
        });
    });
}