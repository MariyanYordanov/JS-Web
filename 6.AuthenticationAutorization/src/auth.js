const bcs = require("bcryptjs");
const { User } = require("./User");

const users = {
    peper: {
        username: "peper",
        password: "12345",
    },
};

async function seed() {
    try {
        await registerUser("peter", "12345", "12345");
    } catch (err) {
        console.log("Database already seeded");
    }
}

async function registerUser(username, password, repass) {
    if (!username) {
        throw new Error("Username is required");
    }
    if (!password) {
        throw new Error("Password is required");
    }
    if (password !== repass) {
        throw new Error("Passwords do not match");
    }

    const existing = await User.findOne({ username });

    if (existing) {
        throw new Error("User already exists");
    }
    if (username.length < 4) {
        throw new Error("Username must be at least 4 characters long");
    }
    if (username.length > 20) {
        throw new Error("Username must be at most 20 characters long");
    }
    if (password.length < 4) {
        throw new Error("Password must be at least 4 characters long");
    }
    if (password.length > 20) {
        throw new Error("Password must be at most 20 characters long");
    }

    const user = new User({
        username,
        hachedPassword: await bcs.hash(password, 8),
    });

    await user.save();
    console.log("Create new user", username);

    return user;
}

async function loginUser(username, password) {
    
    if (!username) {
        throw new Error("Username is required");
    }
    if (!password) {
        throw new Error("Password is required");
    }

    const user = await User.findOne({ username });

    if (!user || !(await bcs.compare(password, user.hachedPassword))) {
        throw new Error("Incorrect username or paswword");
    }

    console.log("User logged in", username);

    return user;
}

module.exports = { registerUser, loginUser };
