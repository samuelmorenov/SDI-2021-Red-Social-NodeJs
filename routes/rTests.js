module.exports = function (app, swig, gestorBD) {

    app.get('/test/resetDB', function (req, res) {

        //Reiniciamos la base de datos
        let criterio = {};
        gestorBD.resetDB(criterio, function () {
        });

        //Añadimos los usuarios para los test
        let usuario = {
            email: 'pedro@email.com',
            name: 'Pedro',
            lastName: 'Díaz',
            password: app.get("crypto").createHmac('sha256', app.get('clave')).update(
                '123456'
            ).digest('hex')
        };
        gestorBD.insertarUsuario(usuario, function (id) {
        });

        usuario = {
            email: 'lucas@email.com',
            name: 'Lucas',
            lastName: 'Núñez',
            password: app.get("crypto").createHmac('sha256', app.get('clave')).update(
                '123456'
            ).digest('hex')
        };
        gestorBD.insertarUsuario(usuario, function (id) {
        });

        usuario = {
            email: 'maria@email.com',
            name: 'María',
            lastName: 'Rodríguez',
            password: app.get("crypto").createHmac('sha256', app.get('clave')).update(
                '123456'
            ).digest('hex')
        };
        gestorBD.insertarUsuario(usuario, function (id) {
        });

        usuario = {
            email: 'marta@email.com',
            name: 'Marta',
            lastName: 'Almonte',
            password: app.get("crypto").createHmac('sha256', app.get('clave')).update(
                '123456'
            ).digest('hex')
        };
        gestorBD.insertarUsuario(usuario, function (id) {
        });

        usuario = {
            email: 'pelayo@email.com',
            name: 'Pelayo',
            lastName: 'Valdes',
            password: app.get("crypto").createHmac('sha256', app.get('clave')).update(
                '123456'
            ).digest('hex')
        };
        gestorBD.insertarUsuario(usuario, function (id) {
        });

        res.send(String("Base de datos reiniciada."));
    });

};