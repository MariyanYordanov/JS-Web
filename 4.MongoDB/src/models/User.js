const mongoose = require("mongoose");

const addressSheama = new mongoose.Schema({
    country: String,
    city: String,
    street: String,
    house: String,
    flat: String,
    postalCode: String,
});

const contactShema = new mongoose.Schema({
    address: [addressSheama],
    phone: String,
    email: String,
    github: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
    youtube: String,
    tiktok: String,
    snapchat: String,
    pinterest: String,
    whatsapp: String,
    telegram: String,
    viber: String,
    skype: String,
    slack: String,
    zoom: String,
    teams: String,
    discord: String,
    twitch: String,
    reddit: String,
    medium: String,
    tumblr: String,
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: {
        type: Number,
        min: 10,
        max: 200,
        required: [ true, 'Age is required' ]
    },
    registrationDate: Date,
    lastLogin: Date,
    isDeleted: Boolean,
    isBlocked: Boolean,
    isBanned: Boolean,
    role: String,
    password: String,
    contacts: [contactShema],
    avatars: [String],
});

userSchema.methods.sayHello = function () {
    return `Hello, my name is ${this.fullName}`;
};

userSchema
    .virtual("fullName")
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    })
    .set(function (value) {
        const parts = value.split(" ");
        if (parts.length < 1) {
            this.firstName = "Dear,";
            this.lastName = "Guest";
        } else {
            this.firstName = parts[0];
            this.lastName = parts[1];
        }
});

userSchema
    .path("firstName")
    .validate(function (value) {
        return value.length > 0;
}, "First name is required");

const User = mongoose.model("User", userSchema);

module.exports = { User };
