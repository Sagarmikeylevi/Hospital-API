const Doctor = require("../models/doctor")

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


module.exports.createSession = async (req , res) =>{
    
}