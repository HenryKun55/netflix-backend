const mongoose = require('mongoose');

const Movie = new mongoose.Schema(
    {
        movieId: {
            type: Number,
            required: true
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
        ],
    }, {
        toObject: { virtuals : true },
        timestamps: true
    }
);

module.exports = mongoose.model('Movie', Movie);