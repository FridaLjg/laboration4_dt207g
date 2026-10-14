const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});