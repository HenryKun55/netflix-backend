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
        photo: {
            type: String,
            default: null
        }
    },
    {
        toObject: { virtuals : true },
        toJSON: { virtuals : true },
        timestamps: true
    }
);

User.method('compare', async (formPass, userPass) => { 
    return bcrypt.compare(formPass, userPass)
})

User.virtual('url').get(function() {
    const url = process.env.URL

    return `${url}files/${encodeURIComponent(this.path)}`
})

User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);