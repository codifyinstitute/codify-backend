const mongoose = require('mongoose');

const courseCardSchema = new mongoose.Schema({
    CourseName:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Description:{
        type:String,
    },
})

const CourseCard = new mongoose.model("CourseCard", courseCardSchema);

module.exports = CourseCard;