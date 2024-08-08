const users = {
    'peper': {
        username: 'peper',
        password: '12345',
    },
};

function registerUser(username, password, repass) {
    
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

    const user = { username, password };
    users[username] = user;
    console.log(username, password);

    return user;
};

function loginUser(username, password) {
    if(!username){
        throw new Error("Username is required");
    }
    if(!password){
        throw new Error("Password is required");
    }
    const user = users[username];
    if (!user || user.password !== password) {
        throw new Error("Incorrect username or paswword");
    }
    return user;
};

module.exports = { registerUser, loginUser };
