const mongoose = require("mongoose");

const { Product } = require("./models/Product");
const { User } = require("./models/User");
const { seedProduct, seedUser } = require("../data/seedData");

async function start() {
    await mongoose.connect("mongodb://localhost:27017/testdb");

    try {
        await seedUser();
        await seedProduct();
    } catch (error) {
        console.log(error.message);
    }

    const users = await User.find({ firstName: "John" });
    const products = await Product.find({ name: "Banana" });

    if (users.length > 0) {
        users.forEach((user) => {
            console.log(user.sayHello());
        });
    }

    if(products.length > 0) {
        products.forEach((product) => {
            console.log(product.name ? product.name : "Product not found");
        });
    }

    const user = await User.create(
        {
            firstName: "Pepi",
            lastName: "Vinkela",
            age: 30,
            registrationDate: new Date(),
            lastLogin: new Date(),
            isDeleted: false,
            isBlocked: false,
            isBanned: false,
            role: "user",
            password: "123456",
        });

        console.log(user);

    mongoose.disconnect();
}

start();
