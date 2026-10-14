const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
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

        //Korrekt, spara användare
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (error) {
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
            return res.status(401({ error: "Felaktigt användarnamn/lösenord!" }));
        }

        //Kontrollera lösenordet
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401({ error: "Felaktigt användarnamn/lösenord!" }));
        } else {
            res.status(200).json({ message: "Användaren loggades in!" });
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;