module.exports = function (app, swig, gestorBD) {

    app.get("/users", function (req, res) {
        let unitsPerPage = 100;
        let criterio = {};

        if (req.query.busqueda != null) {
            let busqueda = {
                $or:
                    [
                        {"email": {$regex: ".*" + req.query.busqueda + ".*"}},
                        {"name": {$regex: ".*" + req.query.busqueda + ".*"}},
                        {"lastName:": {$regex: ".*" + req.query.busqueda + ".*"}}
                    ]
            };
            criterio = {$and: [criterio, busqueda]};
        }

        let pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        gestorBD.obtenerListaPaginada('usuarios', criterio, pg, unitsPerPage, function (users, total) {
            if (users == null) {
                req.session.error = "Error: No se ha podido obtener la lista de usuarios";
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

                criterio = {emisorEmail: req.session.usuario};
                gestorBD.obtenerLista('invitaciones', criterio, function (invitaciones, total) {
                    criterio = {
                        $or:
                            [
                                {usuario1Email: req.session.usuario},
                                {usuario2Email: req.session.usuario},
                            ]
                    };
                    gestorBD.obtenerLista('amistades', criterio, function (amistades, total) {

                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];

                            user["buttonDisabled"] = 'enabled';//enabled / disabled
                            user["buttonText"] = 'Enviar Solicitud';


                            if (user.email == req.session.usuario) {
                                user["buttonDisabled"] = 'disabled';//enabled / disabled
                                user["buttonText"] = ' ';
                            } else {
                                if (invitaciones != null) {
                                    for (let j = 0; j < invitaciones.length; j++) {
                                        if (user.email == invitaciones[j].receptorEmail) {
                                            user["buttonDisabled"] = 'disabled';//enabled / disabled
                                            user["buttonText"] = 'Solicitud enviada';
                                        }
                                    }
                                }
                                if (amistades != null) {
                                    for (let k = 0; k < amistades.length; k++) {
                                        if (user.email == amistades[k].usuario1Email || user.email == amistades[k].usuario2Email) {
                                            user["buttonDisabled"] = 'disabled';//enabled / disabled
                                            user["buttonText"] = 'Ya sois amigos';
                                        }
                                    }
                                }
                            }
                        }

                        let respuesta = swig.renderFile('views/users/list.html',
                            {
                                users: users,
                                paginas: paginas,
                                actual: pg,
                                loggedUser: req.session.usuario != null
                            });
                        res.send(respuesta);

                    });
                });
            }
        });

    });

}