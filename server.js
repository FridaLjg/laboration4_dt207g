const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);

//Start applikation
app.listen(port, () => {
    console.log(`Servern har startat på http://localhost:${port}`);
});

