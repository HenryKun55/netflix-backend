const Rating = require('../models/Rating');
const Movie = require('../models/Movie');
const User = require('../models/User');
const { decodeJwt } = require('../util/decode')

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

        user.ratings.push(newRating._id)
        await user.save()

        const { photo, name, urlImage } = newRating.user;

        return res.json({
            _id: newRating._id, 
            user: { 
                _id: newRating.user._id, 
                photo,
                name,
                urlImage,
            },
            users: newRating.users,
            message,
            rating
        });

    }

    async index(req, res) {
        const ratings = await Rating.find()
        return res.json(ratings)
    }

}

module.exports = new RatingController()