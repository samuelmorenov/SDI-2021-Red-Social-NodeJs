module.exports = function (app, swig, gestorBD) {

    app.get("/users", function (req, res) {
        let respuesta = swig.renderFile('views/users/list.html', {});
        res.send(respuesta);
    });

}