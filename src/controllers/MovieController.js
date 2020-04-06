const Movie = require('../models/Movie');
const User = require('../models/User');
const { decodeJwt } = require('../util/decode')
const mongoose = require('mongoose')

class MovieController {
    
    async store(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = decodeJwt(token);
        const user = await User.findById(decoded)

        const movie = await Movie.findOne({movieId: req.body.movieId})

        if(!movie) {
            const movieCreate = await Movie.create(req.body)
            movieCreate.users.push(user._id)
            await movieCreate.save()
            return res.json(movieCreate)
        } else {
            const check = await Movie.findOne({"_id": movie._id, "users": mongoose.Types.ObjectId(user._id)})
            if(check) {
                movie.users.pull(user)
            }else {
                movie.users.push(user._id)
            }   
            await movie.save()
        }   
        
        return res.json(movie)

    }

    async show(req, res) { 
        const movie = await Movie.findOne({movieId: req.params.id})
            .populate({
                path: 'ratings',
                model: 'Rating',
                select: ['_id', 'message', 'rating', 'user' ],
                populate: {
                    path: 'user',
                    model: 'User',
                    select: ['_id', 'name', 'urlImage', 'photo' ]
                }
            })
        return res.json(movie)
    }

}

module.exports = new MovieController()