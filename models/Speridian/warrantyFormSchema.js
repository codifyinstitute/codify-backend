const mongoose = require("mongoose");

const warrantyFormSchema = new mongoose.Schema({
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
    CompanyName: {
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

const WarrantyForm = mongoose.model('WarrantyForm', warrantyFormSchema);

module.exports = WarrantyForm;