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
        let respuesta = swig.renderFile('views/invitations/list.html', {loggedUser: req.session.usuario != null});
        res.send(respuesta);
    });
}