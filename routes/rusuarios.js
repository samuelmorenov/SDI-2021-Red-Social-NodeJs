module.exports = function (app, swig, gestorBD) {

    app.post('/signup', function (req, res) {
        let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        let usuario = {
            email: req.body.email,
            password: seguro
        }
        gestorBD.insertarUsuario(usuario, function (id) {
            if (id == null) {
                res.redirect("/signup?mensaje=Error al registar usuario");
            } else {
                res.redirect("/login?mensaje=Nuevo usuario registrado")
            }
        });
    });

    app.get("/signup", function (req, res) {
        let respuesta = swig.renderFile('views/signup.html', {});
        res.send(respuesta);
    });

    app.get("/login", function (req, res) {
        let respuesta = swig.renderFile('views/login.html', {});
        res.send(respuesta);
    });

    app.post("/login", function (req, res) {
        let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        let criterio = {
            email: req.body.email,
            password: seguro
        }
        gestorBD.obtenerUsuarios(criterio, function (usuarios) {
            if (usuarios == null || usuarios.length == 0) {
                req.session.usuario = null;
                res.redirect("/login" +
                    "?mensaje=Email o password incorrecto" +
                    "&tipoMensaje=alert-danger ");

            } else {
                req.session.usuario = usuarios[0].email;
                res.redirect("/index");
            }
        });
    });

    app.get('/logout', function (req, res) {
        req.session.usuario = null;
        res.send("Usuario desconectado");
    });

    app.get("/index", function (req, res) {
        let respuesta = swig.renderFile('views/index.html', {});
        res.send(respuesta);
    });

};