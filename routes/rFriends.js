module.exports = function (app, swig, gestorBD) {

    app.get("/friends", function (req, res) {
        let respuesta = swig.renderFile('views/friends/list.html', {loggedUser: req.session.usuario != null});
        res.send(respuesta);
    });
}