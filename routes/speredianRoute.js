const express = require('express');
const router = new express.Router();
const SperidianContact = require('./../models/speridianSchema')


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
            Message
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

})

module.exports = router;