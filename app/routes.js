var User = require('./models/user');

module.exports = function(app,passport){
    app.get('/',(req,res) =>  {
        res.render('index.ejs');
    })

    app.get('/signup',(req,res) => {
        res.render('signup.ejs',{message : req.flash('signupMessage') });
    })

    app.post('/signup', passport.authenticate('local-signup',{
        successRedirect : '/',
        failureRedirect : '/signup',
        failureFlash : true
    }));


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