const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    reports: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
        
    ]
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient' , patientSchema);
module.exports = Patient;