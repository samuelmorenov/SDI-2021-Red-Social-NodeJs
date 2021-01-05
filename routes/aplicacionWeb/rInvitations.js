module.exports = function (app, swig, gestorBD) {

    app.post('/invitations/send', function (req, res) {

        if (req.body.email == null) {
            req.session.error = "Error: No se ha podido obtener el email";
            res.redirect('/error');
            return;
        }
        if (req.session.usuario == null) {
            res.redirect('/login');
            return;
        }
        let invitacion = {
            emisorEmail: req.session.usuario,
            receptorEmail: req.body.email
        };
        gestorBD.insertarInvitacion(invitacion, function (id) {
            if (id == null) {
                req.session.error = "Error: No se ha podido insertar la invitacion en la base de datos";
                res.redirect('/error');
            } else {
                res.redirect('/users');
            }
        });
    });

    app.get("/invitations", function (req, res) {
        let unitsPerPage = 100;

        if (req.session.usuario == null) {
            res.redirect('/login');
            return;
        }
        let criterio = {receptorEmail: req.session.usuario};

        //Obtenemos el numero de pagina de la query
        let pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        //Obtenemos la lista de emisores de invitaciones para la que el usuario actual es receptor
        gestorBD.obtenerListaPaginada('invitaciones', criterio, pg, unitsPerPage, function (invitaciones, total, emisores, paginas) {
                if (invitaciones == null) {
                    req.session.error = "Error: No se ha podido obtencioner la lista de invitaciones";
                    res.redirect('/error');
                } else {
                    if (invitaciones.length == 0) {
                        req.session.error = "No tienes peticiones pendientes";
                        res.redirect('/error');
                    } else {
                        //Calculamos las paginas
                        let ultimaPg = total / unitsPerPage;
                        if (total % unitsPerPage > 0) { // Sobran decimales
                            ultimaPg = ultimaPg + 1;
                        }
                        let paginas = [];
                        for (let i = pg - 2; i <= pg + 2; i++) {
                            if (i > 0 && i <= ultimaPg) {
                                paginas.push(i);
                            }
                        }
                        //Transformamos la lista de peticiones en un array de usuarios
                        let emisores = [];
                        for (let i = 0; i < invitaciones.length; i++) {
                            emisores.push(invitaciones[i].emisorEmail);
                        }

                        let criterioUsers = {"email": {$in: emisores}};
                        //Obtenemos la lista de usuarios de la base de datos
                        gestorBD.obtenerUsuarios(criterioUsers, function (usuarios) {
                            if (usuarios == null || usuarios.length < 1) {
                                req.session.error = "Error: No se han podido obtener los usuarios";
                                res.redirect('/error');
                            } else {

                                let respuesta = swig.renderFile('views/invitations/list.html',
                                    {
                                        emisores: usuarios,
                                        paginas: paginas,
                                        actual: pg,
                                        loggedUser: req.session.usuario != null
                                    });
                                res.send(respuesta);
                            }
                        });
                    }
                }
            }
        );
    });

    app.post('/invitations/accept', function (req, res) {
        if (req.body.email == null) {
            req.session.error = "Error: No se ha podido obtener el email";
            res.redirect('/error');
            return;
        }
        if (req.session.usuario == null) {
            res.redirect('/login');
            return;
        }
        let amistad = {
            usuario1Email: req.session.usuario,
            usuario2Email: req.body.email
        };
        let invitacion = {
            emisorEmail: req.body.email,
            receptorEmail: req.session.usuario
        };
        gestorBD.obtenerInvitacion(invitacion, function (invitaciones) {
            if (invitaciones == null || invitaciones.length == 0) {
                req.session.error = "Error: No se ha podido acceder a las invitaciones guardadas";
                res.redirect('/error');
            } else {
                let id = invitaciones[0]._id;
                invitacion = { _id : id };

                gestorBD.insertarAmistad(amistad, function (id) {
                    if (id == null) {
                        req.session.error = "Error: No se ha podido guardar la amistad en la base de datos";
                        res.redirect('/error');
                    } else {
                        gestorBD.borrarInvitacion(invitacion, function (result) {
                            if (result == null) {
                                req.session.error = "Error: No se ha podido borrar la invitacion de la base de datos";
                                res.redirect('/error');
                            } else {
                                res.redirect('/invitations');
                            }
                        });
                    }

                });
            }
        });

    });
}