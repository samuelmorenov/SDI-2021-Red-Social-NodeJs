module.exports = function (app, swig, gestorBD) {

    app.get("/users", function (req, res) {
        let respuesta = swig.renderFile('views/users/list.html', {loggedUser: req.session.usuario != null});
        res.send(respuesta);
    });

}