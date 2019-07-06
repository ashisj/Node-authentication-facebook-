var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport){
    passport.serializeUser((user,done) => {
        done(null,user.id)
    });

    passport.deserializeUser((id,done) => {
        User.findById(id,(err,user) => {
            done(err,user);
        });
    });

    passport.use('local-signup',new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req,email,password,done){
        process.nextTick(()=>{
            User.findOne({'local.username':email},(err,user)=>{
                if(err)
                    return done(err);
                if(user){
                    return done(null,false,req.flash('signupMessage','That email already taken'));
                } else {
                    var newUser = new User();
                    newUser.local.username = email;
                    newUser.local.password = password;

                    newUser.save((err)=>{
                        if(err)
                            throw err;
                        return done(null,newUser);
                    });
                }
            })
        })
    }
    ))

}