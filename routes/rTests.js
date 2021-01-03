module.exports = function (app, mongo) {

    app.get('/test/resetDB', function (req, res) {

        let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update("123456").digest('hex');
        let usuarios =
            [
                {email: "pedro@email.com", name: "Pedro", lastName: "Díaz", password: seguro},
                {email: "lucas@email.com", name: "Lucas", lastName: "Núñez", password: seguro},
                {email: "maria@email.com", name: "María", lastName: "Rodríguez", password: seguro},
                {email: "marta@email.com", name: "Marta", lastName: "Almonte", password: seguro},
                {email: "pelayo@email.com", name: "Pelayo", lastName: "Valdes", password: seguro}
            ];

        //Abrimos la conexion con mongo
        mongo.MongoClient.connect(app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                let collection = db.collection('usuarios');
                //Eliminamos todos los usuarios del sistema
                let criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        //Si se han eliminado todos insertamos los nuevos
                        let collection = db.collection('usuarios');
                        collection.insertMany(usuarios, function (err, result) {
                            if (err) {
                                funcionCallback(null);
                            } else {
                                res.send(String("Base de datos reiniciada."));
                            }
                        });
                    }
                    db.close();
                });
            }
        });
    })
};