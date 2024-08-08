const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    hachedPassword: { type: String, required: true },
    //collation: { locale: 'en', strength: 2 } -> for case insensitive search
});

const User = model('User', userSchema);

module.exports = { User };