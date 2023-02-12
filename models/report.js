const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    diagnose: {
        type: String,
        required: true,
        enum: ['Refractive Errors','Cataracts', 'Glaucoma' , 'Diabetic Retinopathy' , 'Others']
    },
    description: {
        type: String,
        required: true
    },
    SuggestedSurgery:{
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const Report = mongoose.model('Report' , reportSchema);
module.exports = Report;