const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);

//Skyddad routes
app.get("/api/protected", authenticateToken, async (req, res) => {
    console.log("Username från JWT:", req.username);
    try {

        const user = await User.findOne({
            username: req.username
        });

        if (!user) {
            return res.status(404).json({
                message: "Användaren hittades inte"
            });
        }

        res.json({
            message: `Välkommen ${user.username}!`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
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

