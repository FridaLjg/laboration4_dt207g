const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABAS).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.error("Kunde inte ansluta till databasen...");
})

//Användar-modell
const User = require("../models/User");

//Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        // Kontrollera om användaren redan finns
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                error: "Användarnamnet finns redan"
            });
        }

        //Korrekt, spara användare
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

//Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        //Finns användaren?
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Felaktigt användarnamn/lösenord!" });
        }

        //Kontrollera lösenordet
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                error: "Felaktigt användarnamn/lösenord!"
            });
        } else {
            //Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            const response = {
                message: "Användaren loggades in!",
                token: token
            }
            res.status(200).json(response);
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;