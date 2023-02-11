const Report = require('../models/report');
module.exports.create = async (req , res) =>{
    try {
        let report = await Report.create({
            doctorId: req.params.id,
            diagnosticInformation: req.body.diagnosticInformation,
            description: req.body.description,
            SuggestedSurgery: req.body.SuggestedSurgery,
            dateTime: req.body.dateTime
        });

        return res.status(200).json({
            message: "Report created successfully",
            data: {
                report: report
            }
        });
    } catch (err) {
        console.log('******' , err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}