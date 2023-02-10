const Doctor = require("../models/doctor")
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req , res) =>{
    try {
        let doctor = await Doctor.findOne({email: req.body.email});
        
        if(!doctor || doctor.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }

        return res.status(200).json( {
            message: 'Sign in successful, here is your token, Please keep it safe!',
            data: {
                token: jwt.sign(doctor.toJSON() , 'hospitalApi' , {expiresIn: '100000'})
            }
        });

    } catch (err) {

        console.log('******' , err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.register = async (req , res) =>{
    try {
        let existingDoctor = await Doctor.findOne({email: req.body.email});
        if(!existingDoctor){
            let doctor = await Doctor.create(req.body);
            return res.status(200).json({
                message: "Registered successfully",
                doctor: doctor
            });
        }else{
            return res.status(409).json({
                error: 'A user with the same email address already exists'
            }); 
        }
    } catch (err) {
        console.log('******' , err);
        return res.status(500).json({
            message: "Error in registation"
        });
    }
}



