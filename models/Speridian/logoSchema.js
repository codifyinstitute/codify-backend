const mongoose = require("mongoose");

const logoSchema = mongoose.Schema({
    Company_Name: {
        type: String,
        required: true
    },
    Company_Logo: {
        type: String,
        required: true
    }
});

const Logo = mongoose.model("Logo", logoSchema);

module.exports = Logo;