var User = require('./models/user');

module.exports = function(app){
    app.get('/',(req,res) =>  {
        res.send("Hello world")
    })

    app.get('/:username/:password',(req,res) => {
        var newUser = new User();
        newUser.local.username = req.params.username;
        newUser.local.password = req.params.password;
        newUser.save((err) => {
            if(err)
                throw err;
        });
        res.send("Success!");
    })
}