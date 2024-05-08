require("dotenv").config();
const express = require('express');
const app = express();
require("./config/DBConn");
const Enquiry = require('./models/enquirySchema');
const cors = require("cors");
const router = require("./routes/route")
const router1 = require("./routes/speredianRoute")

app.use(express.json());
app.use(cors());
app.use(router);
app.use(router1);



const PORT = 8000 || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));