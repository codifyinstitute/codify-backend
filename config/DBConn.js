const mongoose = require('mongoose');
require("dotenv").config();

const DB = "mongodb+srv://harshitraul15:root@cluster0.6ddtrzk.mongodb.net/TryCatch?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB).then(()=>console.log('MongoDB Connected...')).catch((err)=> console.log(err.message));