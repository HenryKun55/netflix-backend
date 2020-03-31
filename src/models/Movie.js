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
                ref: "Rating"
            }
        ]
    }, {
        toObject: { virtuals : true },
        toJSON: { virtuals : true },
        timestamps: true
    }
);

module.exports = mongoose.model('Movie', Movie);