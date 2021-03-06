const Rating = require('../models/Rating');
const User = require('../models/User');
const Movie = require('../models/Movie');
const { decodeJwt } = require('../util/decode')
const mongoose = require('mongoose')

class LikeRatingController {
    
    async store(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        const { page = 1 } = req.body
        const decoded = decodeJwt(token);
        const user = await User.findById(decoded)
        const perPage = 10
        const favorites = await Movie.find({"users": mongoose.Types.ObjectId(user._id)}).select('movieId').limit(perPage).skip((page - 1) * perPage)
        const count = await Movie.find({"users": mongoose.Types.ObjectId(user._id)}).countDocuments()
        console.log(count)

        res.header('X-Total-Count', count);

        return res.json(favorites)
    }

}

module.exports = new LikeRatingController()