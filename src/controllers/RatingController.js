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

        const newRating = await Rating.create({
            user,
            movieId,
            message,
            rating
        })
        
        const {_id, name, ...rest} = newRating.user

        user.ratings.push(newRating._id)
        await user.save()

        return res.json({rating: { userId: _id, name, message, rating }});

        if(!movie) {
            const movieCreate = await Movie.create(req.body)
            movieCreate.users.push(user._id)
            await movieCreate.save()
            return res.json(movieCreate)
        } else {
            const check = await Movie.findOne({"_id": movie._id, "users": mongoose.Types.ObjectId(user._id)})
            if(check) {
                movie.users.pull(user)
            } else {
                movie.users.push(user._id)
            }   
            await movie.save()
        }   
        
        return res.json(movie)

    }

    async index(req, res) {
        const ratings = await Rating.find()
        console.log(ratings);
        return res.json(ratings)
    }

}

module.exports = new RatingController()