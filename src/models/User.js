const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

User.method('compare', async (formPass, userPass) => { 
    return bcrypt.compare(formPass, userPass)
})

User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);