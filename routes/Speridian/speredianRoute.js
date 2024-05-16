const express = require('express');
const router = new express.Router();
const SperidianContact = require('./../../models/Speridian/speridianSchema');
const WarrantyForm = require('./../../models/Speridian/warrantyFormSchema');
const moment = require('moment-timezone');


router.post("/add-speridian-contact", async (req, res) => {
    const { FirstName, LastName, Email, Phone, Organization, Country, Message } = req.body;
    try {
        const storeData = new SperidianContact({
            FirstName,
            LastName,
            Email,
            Phone,
            Organization,
            Country,
            Message,
            Date: moment().tz('Asia/Kolkata').format('YYYY-MM-DD'),
            Time: moment().tz('Asia/Kolkata').format('HH:mm:ss')

        })
        await storeData.save();
        res.status(201).json({
            status: "success",
            message: "Data Stored Successfully"
        })
    } catch {
        res.status(400).json({
            status: "failed",
            message: "error while uploading data"
        })
    }

});

router.post("/add-warranty-data", async (req, res) => {
    const { FirstName, LastName, Email, CompanyName } = req.body;

    try {
        const storeData = new WarrantyForm({
            FirstName,
            LastName,
            Email,
            CompanyName,
            Date: moment().tz('Asia/Kolkata').format('YYYY-MM-DD'),
            Time: moment().tz('Asia/Kolkata').format('HH:mm:ss')
        })
        await storeData.save();
        res.status(201).json({
            status: "success",
            message: "Data Stored Successfully",
            storeData
        })
    } catch {
        res.status(400).json({
            status: "failed",
            message: "error while uploading data"
        })
    }
});

module.exports = router;