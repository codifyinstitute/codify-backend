const mongoose = require("mongoose");

const speridianSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Organization: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required:true
    },
    Message: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    }
});

const SperidianContact = mongoose.model("SperidianContact", speridianSchema)

module.exports = SperidianContact;