const Rating = require('../models/Rating');
const User = require('../models/User');
const Movie = require('../models/Movie');
const { decodeJwt } = require('../util/decode')
const mongoose = require('mongoose')

class LikeRatingController {
    
    async store(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = decodeJwt(token);
        const user = await User.findById(decoded)
        const favorites = await Movie.aggregate([
          {
            $lookup: {
              from: 'users',
              pipeline: [
                { $match: { _id: user._id } },
              ],
              as: 'favorites'
            }
          },
          {
            $limit: 5
          }
        ])

        return res.json(favorites)

    }

}

module.exports = new LikeRatingController()