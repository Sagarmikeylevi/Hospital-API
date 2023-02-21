const Patient = require("../models/patient"); // Importing the Patient model

// Function to handle patient registration requests
module.exports.register = async (req , res) => {
    try {
        let existingPatient = await Patient.findOne({number: req.body.number}); // Finding if a patient with the provided number already exists in the database
        if (!existingPatient) { // If a patient doesn't exist with the provided number, create a new patient record
            let patient = await Patient.create(req.body);
            return res.status(200).json({
                message: "Registered successfully", // Returning a success response after creating the new patient record
                data: {
                    patient: patient // Returning the new patient record in the response data
                }
            });
        } else { // If a patient already exists with the provided number, return an error response
            return res.status(409).json({
                error: 'A patient with the same number already exists'
            });
        }
    } catch (err) {
        console.log('******', err);
        return res.status(500).json({
            error: "Internal Server Error" // Handling and returning an error response if an error occurs during the execution of the function
        });
    }
}


