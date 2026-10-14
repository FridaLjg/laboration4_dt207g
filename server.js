const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);

//Skyddad routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" });
});

//Validera Token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Token

    if (token == null) {
        return res.status(401).json({ message: "Not authorized for this route - token missing!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Ogiltig JWT" });

        req.username = user.username;
        next();
    });
}

//Start applikation
app.listen(port, () => {
    console.log(`Servern har startat på http://localhost:${port}`);
});

