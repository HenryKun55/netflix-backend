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
        },
        ratings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                red: "Rating"
            }
        ],
        likeRatings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                red: "Rating"
            }
        ]
    },
    {
        toObject: { virtuals : true },
        toJSON: { virtuals : true,  },
        timestamps: true,
        id: false,
    }
);

User.method('compare', async (formPass, userPass) => { 
    return bcrypt.compare(formPass, userPass)
})

User.virtual('urlImage').get(function() {
    const url = process.env.URL

    return `${url}files/${encodeURIComponent(this.photo)}`
})

User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);