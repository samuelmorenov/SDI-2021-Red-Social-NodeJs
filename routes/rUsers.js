module.exports = function (app, swig, gestorBD) {

    app.get("/users", function (req, res) {

        let usersPorPagina = 100;

        let criterio = {};

        if (req.query.searchText != null) {
            criterio = {"email": {$regex: ".*" + req.query.busqueda + ".*"}};
        }

        let pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        gestorBD.obtenerListaUsuarios(criterio, pg, usersPorPagina, function (users, total) {
            if (users == null) {
                res.send("Error al listar ");
            } else {
                let ultimaPg = total / usersPorPagina;
                if (total % usersPorPagina > 0) { // Sobran decimales
                    ultimaPg = ultimaPg + 1;
                }
                let paginas = []; // paginas mostrar
                for (let i = pg - 2; i <= pg + 2; i++) {
                    if (i > 0 && i <= ultimaPg) {
                        paginas.push(i);
                    }
                }
                let respuesta = swig.renderFile('views/users/list.html',
                    {
                        users: users,
                        paginas: paginas,
                        actual: pg,
                        loggedUser: req.session.usuario != null
                    });
                console.log(users);
                res.send(respuesta);
            }
        });

    });


    app.get('/administrar', function (req, res) {
        let criterio = {};
        gestorBD.administrar(criterio, function () {
            res.send(String("Base de datos administrada."));
        });
    });

}