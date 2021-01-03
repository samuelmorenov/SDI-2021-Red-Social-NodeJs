module.exports = function (app, swig, gestorBD) {

    app.post('/invitations/send', function (req, res) {

        let invitacion = {
            emisor: req.session.usuario,
            receptor: req.body.email,
            aceptada: false
        }

        if (invitacion.emisor == null) {
            res.redirect("/login");
            return;
        }

        if (invitacion.receptor == null) {
            //console.log("El email del receptor es null");
            res.redirect('/error');
            return;
        }

        gestorBD.obtenerUsuarios({email: invitacion.receptor}, function (usuarios) {
            if (usuarios == null || usuarios.length == 0) {
                //console.log("El email del receptor no se encuentra en la base de datos");
                res.redirect('/error');
                return;
            }
            else{
                invitacion.receptor = usuarios[0];
            }
        });

        gestorBD.obtenerUsuarios({email: invitacion.emisor}, function (usuarios) {
            if (usuarios == null || usuarios.length == 0) {
                res.redirect('/error');
                return;
            }
            else{
                invitacion.emisor = usuarios[0];
            }
        });

        gestorBD.insertarInvitacion(invitacion, function (id) {
            if (id == null) {
                //console.log("Error al insertar la invitacion en la base de datos");
                res.redirect('/error');
            } else {
                res.redirect('/users');
            }
        });
    });

    app.get("/invitations", function (req, res) {
        let unitsPerPage = 100;

        let receptor = req.session.usuario;

        if (receptor == null) {
            res.redirect('/login');
            return;
        }

        let criterio = {"receptor.email" : receptor};

        let pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        gestorBD.obtenerListaInvitaciones(criterio, pg, unitsPerPage, function (invitaciones, total) {
            if (invitaciones == null) {
                res.send("Error al listar ");
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
                let respuesta = swig.renderFile('views/invitations/list.html',
                    {
                        invitations: invitaciones,
                        paginas: paginas,
                        actual: pg,
                        loggedUser: req.session.usuario != null
                    });
                console.log("Obtenidas invitaciones: "+invitaciones.length);
                res.send(respuesta);
            }
        });

    });
}