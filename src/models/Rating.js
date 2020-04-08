const mongoose = require('mongoose');

const Rating = new mongoose.Schema(
    {
        message: {
            type: String,
        },
        rating: {
            type: Number,
            required: true,
        },
        movieId: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User" 
            }
        ]
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Rating', Rating);