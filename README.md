1. cookie-parser
```
cookie-parser looks at the header in between the client and server transaction.
read those headers and parses out the cookie that are being send
```

2. express-session
```
It allows us to authenticate the transaction between the client and server
```

3.passport
```
It is a middleware for node js that uses strategy to authenticate user

Serializing User means creating unique id by using unique data for identification so no need to check for username.

Deserializing user means looking into unique id bring back all the details of the user
```

4. passport-facebook
```
go to the link "developers.facebook.com/apps/" and create an account.

npm i passport-facebook

add credential for facebook oauth in cinfig file
In models add
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    }
In router file
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', 
        { 
            successRedirect: '/profile',
	        failureRedirect: '/' 
        })
    );


In auth.js file
    module.exports = {
        'facebookAuth' : {
            'clientID' : '',
            'clientSecret' : '',
            'callbackURL' : 'http://localhost:8080/auth/facebook/callback'
        }
    }

In passport.js
var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('./auth');

    passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'facebook.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
	    				//newUser.facebook.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
                        })
                        console.log(accessToken, refreshToken,profile);
	    			}
	    		});
	    	});
	    }
	));

```