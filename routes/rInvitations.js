module.exports = function (app, swig, gestorBD) {

    app.get('/invitations/send/:email', function (req, res) {

        let id = req.params.email;

        res.send(String("Peticion enviada a user.id: "+id));


    });

}