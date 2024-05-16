const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    CourseName: {
        type: String,
        required: true
    },
    NavName: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    CourseContent: [
        {
            Heading: {
                type: String,
                required: true
            },
            subheadings: [String]
        }
    ],
    Skills: [String],
    WYWL: [String]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
