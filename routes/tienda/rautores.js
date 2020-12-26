module.exports = function (app, swig) {

    app.post("/autor", function (req, res) {
        res.send("Autor agregado:" + req.body.nombre + "<br>"
            + " Grupo :" + req.body.grupo + "<br>"
            + " Rol: " + req.body.rol); //TO-DO: Comprobar que no sea vacio
    });

    app.get('/autores/agregar', function (req, res) {
        let respuesta = swig.renderFile('views/autores-agregar.html', {});
        res.send(respuesta);
    })

    app.get("/autores", function (req, res) {
        var autores = [
            {"nombre": "Juan", "grupo": "Los escarabajos", "rol": "Guitarrista"},
            {"nombre": "Federico", "grupo": "Reina", "rol": "Cantante"}
        ];
        let respuesta = swig.renderFile('views/autores.html', {
            autores: autores
        });
        res.send(respuesta);
    });

    app.get("/autores/*", function (req, res) {
        res.redirect("/autores");
    });

}