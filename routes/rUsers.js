module.exports = function (app, swig, gestorBD) {



    app.get("/users", function (req, res) {

        let criterio = {};

        /*
        if (req.query.busqueda != null) {
            criterio = {"nombre": {$regex: ".*" + req.query.busqueda + ".*"}};
        }
        */

        let pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        gestorBD.obtenerUsuariosPg(criterio, pg, function (users, total) {
            if (users == null) {
                res.send("Error al listar ");
            } else {
                let ultimaPg = total / 4;
                if (total % 4 > 0) { // Sobran decimales
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
                        actual: pg
                    });
                res.send(respuesta);
            }
        });





    });

}