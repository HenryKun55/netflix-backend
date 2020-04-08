const Rating = require('../models/Rating');
const User = require('../models/User');
const { decodeJwt } = require('../util/decode')
const mongoose = require('mongoose')

class LikeRatingController {
    
    async store(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = decodeJwt(token);
        const user = await User.findById(decoded)

        const { idRating } = req.params

        const rating = await Rating.findOne({_id: idRating})

        const check = await Rating.findOne({"_id": rating._id, "users": mongoose.Types.ObjectId(user._id)})

        if(check) {
            rating.users.pull(user)
            user.likeRatings.pull(user)
        } else {
            rating.users.push(user._id)
            user.likeRatings.push(user._id)
        }   

        await rating.save()
        await user.save()

        return res.json(rating)

    }

}

module.exports = new LikeRatingController()