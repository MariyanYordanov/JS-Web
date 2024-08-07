const users = {
    'pepi': {
        username: 'pepi',
        password: '1234',
    },
};

function registerUser(username, password) {
    if (users[username]) {
        throw new Error("User already exists");
    }
    const user = { username, password };
    users[username] = user;
    return user;
};

function loginUser(username, password) {
    const user = users[username];
    if (!user || user.password !== password) {
        throw new Error("Incorrect username or paswword");
    }
    return user;
};

module.exports = { registerUser, loginUser };
