module.exports = function (app, gestorBD) {
    var usuario;
    app.get("/api/cancion", function (req, res) {
        gestorBD.obtenerCanciones({}, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({error: "se ha producido un error"})
            } else {
                res.status(200);
                res.send(JSON.stringify(canciones));
            }
        });
    });

    app.get("/api/cancion/:id", function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)}
        gestorBD.obtenerCanciones(criterio, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({error: "se ha producido un error"})
            } else {
                res.status(200);
                res.send(JSON.stringify(canciones[0]));
            }
        });
    });

    app.delete("/api/cancion/:id", function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)}

        gestorBD.obtenerCanciones(criterio, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({
                    error: "La cancion no existe"
                });
            } else if (canciones[0].autor !== usuario) {
                res.status(500);
                res.json({
                    error: "Debes ser el autor de la cancion para eliminarla"
                });
            } else {
                gestorBD.eliminarCancion(criterio, function (canciones) {
                    if (canciones == null) {
                        res.status(500);
                        res.json({error: "se ha producido un error"})
                    } else {
                        res.status(200);
                        res.send(JSON.stringify(canciones));
                    }
                });
            }
        })
    });

    app.post("/api/cancion", function (req, res) {
            let cancion = {
                nombre: req.body.nombre,
                genero: req.body.genero,
                precio: req.body.precio,
                autor: usuario
            };

            // ¿Validar nombre, genero, precio?
            if (cancion.nombre.length <= 2 || cancion.genero.length <= 2) {
                res.status(500);
                res.json({
                    error: "Los campos de nombre y genero deben tener al menos 3 caracteres"
                });
                return null;
            } else {
                if (cancion.precio <= 0) {
                    res.status(500);
                    res.json({
                        error: "El precio debe tener un valor positivo"
                    });
                    return null;
                } else {
                    var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};

                    gestorBD.obtenerCanciones(criterio, function (canciones) {
                        if (canciones == null) {
                            res.status(500);
                            res.json({
                                error: "La cancion no existe"
                            });
                        } else if (canciones[0].autor !== usuario) {
                            res.status(500);
                            res.json({
                                error: "Debes ser el autor de la cancion para eliminarla"
                            });
                        } else {
                            gestorBD.insertarCancion(cancion, function (id) {
                                if (id == null) {
                                    res.status(500);
                                    res.json({error: "se ha producido un error"})
                                } else {
                                    res.status(201);
                                    res.json({mensaje: "canción insertarda", _id: id})
                                }
                            });
                        }
                    })
                }
            }
        }
    );

    app.put("/api/cancion/:id", function (req, res) {

        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};

        let cancion = {}; // Solo los atributos a modificar

        if (req.body.nombre != null)
            cancion.nombre = req.body.nombre;
        if (req.body.genero != null)
            cancion.genero = req.body.genero;
        if (req.body.precio != null)
            cancion.precio = req.body.precio;
        if (cancion.nombre.length <= 2 || cancion.genero.length <= 2) {
            res.status(500);
            res.json({
                error: "Los campos de nombre y genero deben tener al menos 3 caracteres"
            });
            return null;
        } else {
            if (cancion.precio <= 0) {
                res.status(500);
                res.json({
                    error: "El precio debe tener un valor positivo"
                });
                return null;
            } else {
                gestorBD.modificarCancion(criterio, cancion, function (result) {
                    if (result == null) {
                        res.status(500);
                        res.json({
                            error: "se ha producido un error"
                        })
                    } else {
                        res.status(200);
                        res.json({
                            mensaje: "canción modificada",
                            _id: req.params.id
                        })
                    }
                });
            }
        }
    });

    app.post("/api/autenticar/", function (req, res) {
        let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        let criterio = {
            email: req.body.email,
            password: seguro
        }

        gestorBD.obtenerUsuarios(criterio, function (usuarios) {
            if (usuarios == null || usuarios.length === 0) {
                res.status(401);
                res.json({
                    autenticado: false
                })
            } else {
                var token = app.get('jwt').sign(
                    {
                        usuario: criterio.email,
                        tiempo: Date.now() / 1000
                    },
                    "secreto");
                usuario = criterio.email;
                console.log("usuario actual = " + usuario);
                res.status(200);
                res.json(
                    {
                        autenticado: true,
                        token: token
                    })
            }
        })
    });
};

