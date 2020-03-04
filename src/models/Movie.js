const mongoose = require('mongoose');

const Movie = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        like: {
            type: Boolean,
            required: true
        },
    }
);

module.exports = mongoose.model('Movie', Movie);