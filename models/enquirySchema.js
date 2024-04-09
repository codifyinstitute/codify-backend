const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    MobileNo: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    }
})

const  Enquiry = new mongoose.model("Enquiry",enquirySchema);

module.exports= Enquiry;