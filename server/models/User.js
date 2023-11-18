const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide name"],
    },
    email: {
        type: String,
        required: [true, "provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "provide password"],
        minlength: 6,
    },
    age: {
        type: Number,
    },
    // availability: [AvailabilitySchema],
    availability: [
        {
            dayOfWeek: {
                type: String,
                enum: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
                required: true,
            },
            startHour: {
                type: Number,
                min: 0,
                max: 23,
                required: true,
            },
            endHour: {
                type: Number,
                min: 0,
                max: 23,
                required: true,
            },
        },
    ],

    gender: String,
    state: String,
    city: String,
    intrests: {
        type: [String],
    },
    contactNo: String,
    skillLevels: String,
});

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre('save', async function (next) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Remove duplicates from the availability array
    const uniqueSet = new Set(this.availability.map(JSON.stringify));
    this.availability = [...uniqueSet].map(JSON.parse);

    next();
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, "jwtsecret", {
        expiresIn: "30d",
    });
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model("User", UserSchema);