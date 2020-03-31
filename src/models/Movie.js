const mongoose = require('mongoose');

const Movie = new mongoose.Schema(
    {
        movieId: {
            type: Number,
            required: true
        },
        like: {
            type: Boolean,
            required: true,
            default: true
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User" 
            }
        ],
        ratings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                red: "Rating"
            }
        ]
    }, {
        toObject: { virtuals : true },
    }
);

module.exports = mongoose.model('Movie', Movie);