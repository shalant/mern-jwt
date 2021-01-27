const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

//authorization to protect endpoints
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey: "NoobCoder"
},(payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err)
            return done(err, false);
        if(user)
            return done(null, user);
        else
            return done(null, false);
    });
}));

//authenticated local strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        //something went trump with DB
        if(err)
            return done(err);
        //if no user exists
        if(!user)
            return done(null, false);
        //check if password is correct
        user.comparePassword(password, done);
    })
}));
