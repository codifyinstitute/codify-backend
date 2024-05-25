const express = require('express');
const router = new express.Router();
const SperidianContact = require('./../../models/Speridian/speridianSchema');
const WarrantyForm = require('./../../models/Speridian/warrantyFormSchema');
const Logo = require("./../../models/Speridian/logoSchema");
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

router.post("/add-company-data", async (req, res) => {
    const { Company_Name,  Company_Logo} = req.body;

    try {
        const storeData = new Logo({
            Company_Name,
            Company_Logo
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


router.get("/get-sp-contact", async (req, res) => {
    try {
        const data = await SperidianContact.find();
        res.status(200).json({
            data
        })
    } catch {
        res.status(400).json({
            status: "failed",
            message: "error while uploading data"
        })
    }
})

router.get("/get-warranty-contact", async (req, res) => {
    try {
        const data = await WarrantyForm.find();
        res.status(200).json({
            data
        })
    } catch {
        res.status(400).json({
            status: "failed",
            message: "error while uploading data"
        })
    }
})

router.get("/get-company-data", async (req, res) => {
    try {
        const data = await Logo.find();
        res.status(200).json({
            data
        })
    } catch {
        res.status(400).json({
            status: "failed",
            message: "error while uploading data"
        })
    }
})

module.exports = router;