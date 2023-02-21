const Report = require('../models/report');
const Patient = require('../models/patient');

// Function to create a new report for a patient
module.exports.create = async (req , res) =>{
    try {
        let report = await Report.create({
            // Create a new report with the provided doctor ID, diagnosis, description, suggested surgery, and date/time
            doctorId: req.params.docId,
            diagnose: req.body.diagnose,
            description: req.body.description,
            SuggestedSurgery: req.body.SuggestedSurgery,
            dateTime: req.body.dateTime
        });

        // Find the patient associated with the report and add the new report to their list of reports
        let patient = await Patient.findById(req.params.id);
        patient.reports.push(report);
        patient.save();

        // Return a success message and the newly created report
        return res.status(200).json({
            message: "Report created successfully",
            data: {
                report: report
            }
        });
    } catch (err) {
        // If there is an error, log it and return an internal server error message
        console.log('******' , err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

// Function to show all reports for a given patient
module.exports.showReports = async (req , res) =>{
    try {
        // Find the patient associated with the reports and check if they have any reports
        let patient = await Patient.findById(req.params.id);
        if(patient.reports.length > 0){
            let reportArray = [];
            // For each report ID in the patient's list of reports, find the corresponding report and add it to an array
            for(let i = 0; i < patient.reports.length; i++){
                let report = await Report.findById(patient.reports[i]);
                console.log(report);
                reportArray.push(report);
            }

            console.log(reportArray);

            // Return a success message and the array of reports
            return res.status(200).json({
                message: "All Reports",
                data: {
                    reports: [
                        reportArray
                    ]
                }
            });
        }else{
            // If the patient has no reports, return a message indicating that
            return res.status(200).json({
                message: "No report found",
            });
        }
    } catch (err) {
        // If there is an error, log it and return an internal server error message
        console.log('******' , err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

// Function to filter reports by diagnosis
module.exports.filterReports = async (req , res) =>{
    try {
        // Find all reports with the provided diagnosis and return them
        let report = await Report.find({diagnose: req.params.diagnose});
        return res.status(200).json({
            message: "Filter Reports",
            data: {
                report: report
            }
        });
    } catch (err) {
        // If there is an error, log it and return an internal server error message
        console.log('******' , err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}
