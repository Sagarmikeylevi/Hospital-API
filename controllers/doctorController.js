const Doctor = require("../models/doctor") // Importing the Doctor model
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library
require('dotenv').config(); // Loading environment variables from a .env file

// Function to handle doctor sign-in requests
module.exports.createSession = async (req, res) => {
    try {
        let doctor = await Doctor.findOne({email: req.body.email}); // Finding the doctor with the provided email address in the request

        if (!doctor || doctor.password != req.body.password) { // Checking if the doctor is found and if the provided password matches the doctor's password
            return res.status(422).json({
                message: "Invalid username or password" // Returning an error response if the doctor is not found or the passwords don't match
            });
        }

        // Generating a JWT using the jsonwebtoken library and returning it to the client
        return res.status(200).json({
            message: 'Sign in successful, here is your token, Please keep it safe!',
            data: {
                token: jwt.sign(doctor.toJSON(), process.env.SecretKey, {expiresIn: '1000000'})
            }
        });

    } catch (err) {
        console.log('******', err);
        return res.status(500).json({
            message: "Internal Server Error" // Handling and returning an error response if an error occurs during the execution of the function
        });
    }
}

// Function to handle doctor registration requests
module.exports.register = async (req, res) => {
    try {
        let existingDoctor = await Doctor.findOne({email: req.body.email}); // Finding if a doctor with the provided email address already exists in the database
        if (!existingDoctor) { // If a doctor doesn't exist with the provided email, create a new doctor record
            let doctor = await Doctor.create(req.body);
            return res.status(200).json({
                message: "Registered successfully", // Returning a success response after creating the new doctor record
            });
        } else { // If a doctor already exists with the provided email, return an error response
            return res.status(409).json({
                error: 'A user with the same email address already exists'
            });
        }
    } catch (err) {
        console.log('******', err);
        return res.status(500).json({
            message: "Error in registation" // Handling and returning an error response if an error occurs during the execution of the function
        });
    }
}



