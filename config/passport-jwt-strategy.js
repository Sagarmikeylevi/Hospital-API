// Import required modules
const passport = require('passport');
const Doctor = require('../models/doctor');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();

// Define options for JWT authentication
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SecretKey
}

// Use the JWTStrategy with the defined options to authenticate requests
passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {

    // Find the Doctor in the database with the corresponding id from the JWT payload
    Doctor.findById(jwtPayLoad._id, function (err, doctor) {
        // If there is an error finding the Doctor, return an error and set the user to false
        if (err) {
            console.log('Error in finding user from JWT');
            return done(err, false);
        }
        // If the Doctor is found, return the Doctor as the authenticated user
        if (doctor) {
            return done(null, doctor);
        } else {
            // If the Doctor is not found
            return done(null, false);
        }
    });

}));

// Export the passport middleware for use in the main application
module.exports = passport;