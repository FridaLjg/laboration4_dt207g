const express = require("express");
const router = express.Router();


//Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
        if(!username || !password) {
            return res.status(400).json({error: "Invalid input, send username and password"});
        }

        //Korrekt, spara användare
        res.status(201).json({message: "User created"});

    } catch (error) {
        res.status(500).json({error: "Server error"});
    }
});

//Logga in användare
router.post("/login", async (req, res) => {
    console.log("login kallad...")
});

module.exports = router;