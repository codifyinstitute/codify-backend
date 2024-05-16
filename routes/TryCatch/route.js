const express = require("express");
const router = new express.Router();
const moment = require('moment-timezone');
const path = require('path');
const Enquiry = require("./../../models/TryCatch/enquirySchema");
const Category = require("./../../models/TryCatch/categorySchema");
const Course = require("./../../models/TryCatch/courseSchema");
const cardUpload = require("./../../config/CardImage");

router.post("/enquiry", async (req, res) => {
    const { Name, MobileNo, Email, CourseName } = req.body;
    try {
        const storeEnquiry = new Enquiry({
            Name, MobileNo, Email, CourseName,
            enquiryDate: moment().tz('Asia/Kolkata').format('YYYY-MM-DD'),
            enquiryTime: moment().tz('Asia/Kolkata').format('HH:mm:ss')
        });

        const storeData = await storeEnquiry.save();

        res.status(201).json({ status: 201, storeData })
    } catch (error) {
        res.status(422).json(error);
    }
});

router.get("/enquiries", async (req, res) => {
    try {
        // Fetch all enquiries
        const enquiries = await Enquiry.find({});

        res.status(200).json({ enquiries });
    } catch (error) {
        res.status(500).json({ error: "Error fetching enquiries" });
    }
});

router.delete("/enquiry/:_id", async (req, res) => {
    const { _id } = req.params;

    try {
        // Find enquiry by ID and delete it
        await Enquiry.findByIdAndDelete(_id);

        res.status(204).json({ message: "Enquiry deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: "Enquiry not found" });
    }
});

router.post("/create-category", cardUpload.single('image'), async (req, res) => {
    try {
        // Extract category and image file name from the request
        const { category } = req.body;
        const imageName = req.file.filename;

        // Create a new category instance
        const newCategory = new Category({
            category,
            ImageName: imageName
        });

        // Save the category to the database
        const savedCategory = await newCategory.save();

        res.status(201).json({ status: 201, savedCategory });
    } catch (error) {
        res.status(422).json(error);
    }
});


router.get("/get-course", async (req, res) => {
    try {
        const cardData = await Course.find();
        res.status(201).json(cardData)
        // console.log(cardData);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.get("/get-category", async (req, res) => {
    try {
        const cardData = await Category.find();
        res.status(201).json(cardData)
        // console.log(cardData);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.post("/:courseName/:Heading/add-subHeading", async (req, res) => {
    // const { CourseName } = req.params;
    const CourseName = req.params.courseName;
    const Heading = req.params.Heading;
    const { subheading } = req.body;

    console.log

    try {
        // Find the course by CourseName
        const course = await Course.findOne({ CourseName });

        // If the course is not found, return an error
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find the index of the heading in the CourseContent array
        const headingIndex = course.CourseContent.findIndex(item => item.Heading === Heading);

        // If the heading is not found, return an error
        if (headingIndex === -1) {
            return res.status(404).json({ message: 'Heading not found' });
        }

        // Push the subheading into the subheadings array of the corresponding heading
        course.CourseContent[headingIndex].subheadings.push(subheading);

        // Save the updated course
        await course.save();

        // Return success response
        res.status(201).json({ message: 'Subheading added successfully' });
    } catch (error) {
        console.error('Error adding subheading:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post("/:courseName/add-skill", async (req, res) => {
    // const { CourseName } = req.params;
    const CourseName = req.params.courseName;
    const { skill } = req.body;

    try {
        const course = await Course.findOne({ CourseName });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.Skills.push(skill);

        await course.save();
        res.status(201).json({ status: 201 })
    } catch (error) {
        console.log('Error While  Adding Skills : ', error);
        return res.status(500).send("There was a problem with your request.");
    }
})

router.post("/:courseName/add-wywl", async (req, res) => {
    // const { CourseName } = req.params;
    const CourseName = req.params.courseName;
    const { wywl } = req.body;

    try {
        console.log(wywl)
        const course = await Course.findOne({ CourseName });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.WYWL.push(wywl);

        await course.save();
        res.status(201).json({ status: 201 })
    } catch (error) {
        console.log('Error While  Adding Skills : ', error);
        return res.status(500).send("There was a problem with your request.");
    }
})

router.post("/:courseName/add-heading", async (req, res) => {
    // const { CourseName } = req.params;
    const CourseName = req.params.courseName;
    const { heading } = req.body;

    try {
        const course = await Course.findOne({ CourseName });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.CourseContent.push({ Heading: heading, subheadings: [] });

        await course.save();
        res.status(201).json({ status: 201 })
    } catch (error) {
        console.log('Error While Adding Skills : ', error);
        return res.status(500).send("There was a problem with your request.");
    }
})

router.get("/:courseName/:Heading/get-subHeading", async (req, res) => {
    let Heading = req.params.Heading;
    let CourseName = req.params.courseName;

    try {
        const course = await Course.findOne({ CourseName });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const headingData = course.CourseContent.find(item => item.Heading === Heading);
        console.log(headingData);
        res.status(201).json(headingData.subheadings);


    } catch (error) {
        console.log(error);
    }
})

router.get("/:courseName/get-skill", async (req, res) => {
    const CourseName = req.params.courseName;
    try {
        const course = await Course.findOne({ CourseName });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(201).json(course.Skills);

        // console.log(course.Skills)
    } catch (error) {
        console.log(error);
    }
})

router.get("/:courseName/get-wywl", async (req, res) => {
    const CourseName = req.params.courseName;
    try {
        const course = await Course.findOne({ CourseName });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(201).json(course.WYWL);

        // console.log(course.Skills)
    } catch (error) {
        console.log(error);
    }
})

router.get("/:courseName/get-heading", async (req, res) => {
    const CourseName = req.params.courseName;
    try {
        const course = await Course.findOne({ CourseName });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(201).json(course.CourseContent);

        // console.log(course.Skills)
    } catch (error) {
        console.log(error);
    }
})

router.get(`/:category/get-courses`, async (req, res) => {
    const Category = req.params.category;

    try {
        const courses = await Course.find({ Category });

        res.status(201).json(courses);
    } catch (error) {
        console.log(error);
    }
})

router.get(`/:courseName/get-courseData`, async (req, res) => {
    const courseName = req.params.courseName;

    try {
        const courses = await Course.find({ CourseName: courseName });

        res.status(201).json(courses);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router