const bcs = require('bcryptjs');

const users = {
    'peper': {
        username: 'peper',
        password: '12345',
    },
};

registerUser('peter', '12345', '12345');

async function registerUser(username, password, repass) {
    
    if(!username){
        throw new Error("Username is required");
    }
    if(!password){
        throw new Error("Password is required");
    }
    if(password !== repass) {
        throw new Error("Passwords do not match");
    }
    if (users[username]) {
        throw new Error("User already exists");
    }
    if(username.length < 4) {
        throw new Error("Username must be at least 4 characters long");
    }
    if(password.length < 4) {
        throw new Error("Password must be at least 4 characters long");
    }
    if(password.length > 20) {
        throw new Error("Password must be at most 20 characters long");
    }

    const user = { 
        username,
        hachedPassword: await bcs.hash(password, 10), 
    };

    users[username] = user;
    console.log("Create new user",username, password);

    return user;
};

async function loginUser(username, password) {
    if(!username){
        throw new Error("Username is required");
    }
    if(!password){
        throw new Error("Password is required");
    }
    const user = users[username];
    if (!user || !(await bcs.compare(password, user.hachedPassword))) {
        throw new Error("Incorrect username or paswword");
    }
    return user;
};

module.exports = { registerUser, loginUser };
