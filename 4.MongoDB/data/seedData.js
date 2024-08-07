const { User } = require("../src/models/User");
const { Product } = require("../src/models/Product");

async function seedUser() {
    const user = new User({
        firstName: "Anita",
        lastName: "Doe",
        age: 25,
        registrationDate: new Date(),
        lastLogin: new Date(),
        isDeleted: false,
        isBlocked: false,
        isBanned: false,
        role: "admin",
        password: "123456",
        contacts: [
            {
                address: [
                    {
                        country: "Ukraine",
                        city: "Kyiv",
                        street: "Khreshchatyk",
                        house: "1",
                        flat: "1",
                        postalCode: "01001",
                    },
                ],
                phone: "+380501234567",
                email: "username@mail.com",
                github: "username@github.com",
                facebook: "facebook.com/username",
                instagram: "instagram.com/username",
                linkedin: "linkedin.com/username",
                twitter: "twitter.com/username",
                youtube: "youtube.com/username",
                tiktok: "tiktok.com/username",
                snapchat: "snapchat.com/username",
                pinterest: "pinterest.com/username",
                whatsapp: "whatsapp.com/username",
                telegram: "telegram.com/username",
                viber: "viber.com/username",
                skype: "skype.com/username",
                slack: "slack.com/username",
                zoom: "zoom.com/username",
                teams: "teams.com/username",
                discord: "discord.com/username",
                twitch: "twitch.com/username",
                reddit: "reddit.com/username",
                medium: "medium.com/username",
                tumblr: "tumblr.com/username",
            },
        ],
    });

    await user.save();
};

async function seedProduct() {
    const product = new Product({
        name: "Orange",
        quantity: 10,
        price: 1.59,
    });

    await product.save();
};

module.exports = { seedProduct, seedUser };