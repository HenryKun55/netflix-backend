const Rating = require('../models/Rating');
const Movie = require('../models/Movie');
const User = require('../models/User');
const { decodeJwt } = require('../util/decode')
const mongoose = require('mongoose')

class RatingController {
    
    async store(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = decodeJwt(token);
        const user = await User.findById(decoded)

        const {movieId, message, rating} = req.body

        const movie = await Movie.findOne({movieId})

        const newRating = await Rating.create({
            user,
            movieId,
            message,
            rating
        })

        if(!movie) {
            const movieCreate = await Movie.create(req.body)
            movieCreate.ratings.push(newRating._id)
            await movieCreate.save()
        } else {
            movie.ratings.push(newRating._id)
            await movie.save()
        }   

        const {_id, name, ...rest} = newRating.user

        user.ratings.push(newRating._id)
        await user.save()

        return res.json({rating: { userId: _id, name, message, rating }});

    }

    async index(req, res) {
        const ratings = await Rating.find()
        return res.json(ratings)
    }

}

module.exports = new RatingController()