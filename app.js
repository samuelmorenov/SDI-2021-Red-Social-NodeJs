// //////////////////////////////////////////////
// ///////////////// Módulos ////////////////////
// //////////////////////////////////////////////

//Express, es un marco de aplicación web de back-end para Node.js
let express = require('express');
let app = express();

// Establecemos los controles de acceso HTTP
// Debemos especificar todas las headers que se aceptan.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

// Jsonwebtoken sirve para la creación de tokens de acceso que permiten la
// propagación de identidad y privilegios
var jwt = require('jsonwebtoken');
app.set('jwt', jwt);

// Definimos el protocolo https
let fs = require('fs');
let https = require('https');

// Configuramos la session
let expressSession = require('express-session');
app.use(expressSession({secret: 'abcdefg', resave: true, saveUninitialized: true}));

// Definimos el modulo de encriptacion para las contraseñas
let crypto = require('crypto');

// Para poder subir archivos
let fileUpload = require('express-fileupload');
app.use(fileUpload());

// Definimos el modulo de la base de datos
let mongo = require('mongodb');

// Definimos el modulo de motor de plantillas
let swig = require('swig');

// Añadimos el parser para json
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routerUsuarioToken
var routerUsuarioToken = express.Router();
routerUsuarioToken.use(function (req, res, next) {
    // obtener el token, vía headers (opcionalmente GET y/o POST).
    var token = req.headers['token'] || req.body.token || req.query.token;
    if (token != null) {
        // verificar el token
        jwt.verify(token, 'secreto', function (err, infoToken) {
            if (err || (Date.now() / 1000 - infoToken.tiempo) > 240) {
                res.status(403); // Forbidden
                res.json({
                    acceso: false,
                    error: 'Token invalido o caducado'
                });
                // También podríamos comprobar que intoToken.usuario existe
                return;

            } else {
                // dejamos correr la petición
                res.usuario = infoToken.usuario;
                next();
            }
        });

    } else {
        res.status(403); // Forbidden
        res.json({
            acceso: false,
            mensaje: 'No hay Token'
        });
    }
});


let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app, mongo);
// routerUsuarioSession
let routerUsuarioSession = express.Router();
routerUsuarioSession.use(function (req, res, next) {
    console.log("routerUsuarioSession");
    if (req.session.usuario) {
        // dejamos correr la petición
        next();
    } else {
        res.redirect("/login");
    }
});

// Establecemos el acceso a la carpeta public
app.use(express.static('public'));

// Contraseña
let fs2 = require('fs');
let pass = fs2.readFileSync('pass.txt', 'utf-8');

// Variables
app.set('port', 8081);
app.set('db', 'mongodb://admin:' + pass + '@tiendamusica-shard-00-00-8d9nh.mongodb.net:27017,tiendamusica-shard-00-01-8d9nh.mongodb.net:27017,tiendamusica-shard-00-02-8d9nh.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true&w=majority');
app.set('clave', 'abcdefg');
app.set('crypto', crypto);

// //////////////////////////////////////////////
// ////////////////// Rutas /////////////////////
// //////////////////////////////////////////////

// Establecimiento de rutas
require("./routes/rLogInSignUp.js")(app, swig, gestorBD);
require("./routes/rUsers.js")(app, swig, gestorBD);

// Redireccion de rutas
app.get('/', function (req, res) {
    res.redirect('/index');
});

// Captura de errores
app.use(function (err, req, res, next) {
    console.log("Error producido: " + err);
    if (!res.headersSent) {
        res.status(400);
        // res.send("Recurso no disponible");
        res.redirect('/error');
    }
});

// Arrancamos el servidor
https.createServer({
	key: fs.readFileSync('certificates/alice.key'),
    cert: fs.readFileSync('certificates/alice.crt')
}, app).listen(app.get('port'),function () {
    console.log("Servidor activo: https://localhost:8081");
});