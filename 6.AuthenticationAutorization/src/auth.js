const users = {};

function registerUser(username, password) {
  if (users[username]) {
    throw new Error('User already exists');
  }
  users[username] = password;
}

function loginUser(username, password) {
  if (users[username] === password) {
    return true;
  }
  return false;
}

module.exports = {  registerUser, loginUser };