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

//Hash lösenord
userSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch (error) {
        next(error);
    }
});

//Regristrera användare
userSchema.statics.register = async (username, password) => {
    try {
        const user = new this ({ username, password});
        await user.save();
        return user;
    } catch(error) {
        throw error;
    }
};