
const Report = require('../models/report');
const Patient = require('../models/patient');
module.exports.create = async (req , res) =>{
    try {
        let report = await Report.create({
            doctorId: req.params.docId,
            diagnose: req.body.diagnose,
            description: req.body.description,
            SuggestedSurgery: req.body.SuggestedSurgery,
            dateTime: req.body.dateTime
        });
        let patient = await Patient.findById(req.params.id);
        patient.reports.push(report);
        patient.save();
        return res.status(200).json({
            message: "Report created successfully",
            data: {
                report: report
            }
        });
    } catch (err) {
        console.log('******' , err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

module.exports.showReports = async (req , res) =>{
    try {
        let patient = await Patient.findById(req.params.id);
        if(patient.reports.length > 0){
            let reportArray = [];
            for(let i = 0; i < patient.reports.length; i++){
                let report = await Report.findById(patient.reports[i]);
                console.log(report);
                reportArray.push(report);
            }

            console.log(reportArray);

            return res.status(200).json({
                message: "All Reports",
                data: {
                    reports: [
                        reportArray
                    ]
                }
            });

            
        }else{
            return res.status(200).json({
                message: "No report found",
            });
        }

    } catch (err) {
        console.log('******' , err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

module.exports.filterReports = async (req , res) =>{
    try {
        let report = await Report.find({diagnose: req.params.diagnose});
        return res.status(200).json({
            message: "Filter Reports",
            data: {
                report: report
            }
        })
    } catch (err) {
        console.log('******' , err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
    

}