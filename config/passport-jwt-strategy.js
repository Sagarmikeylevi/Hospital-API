const passport = require('passport');
const Doctor = require('../models/doctor');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hospitalApi'
 }

 passport.use(new JWTStrategy(opts , function(jwtPayLoad, done){

   Doctor.findById(jwtPayLoad._id , function(err , doctor){
        if (err) {
            console.log('Error in finding user from JWT');
            return done(err, false);
        }

        if (doctor) {
            return done(null, doctor);
        } else {
            return done(null, false);
        }
    });

 }));

module.exports = passport;