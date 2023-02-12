const Patient = require("../models/patient");

module.exports.register = async (req , res) =>{
    try {
        let existingPatient = await Patient.findOne({number: req.body.number});
        if(!existingPatient){
            let patient = await Patient.create(req.body);
            return res.status(200).json({
                message: "Registered successfully",
                data:{
                    patient: patient
                }
                
            });
        }else{
            return res.status(409).json({
                error: 'A patient with the same number already exists'
            }); 
        }
    } catch (err) {
        console.log('******' , err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

