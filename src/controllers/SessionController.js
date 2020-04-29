const User = require('../models/User')
const passport = require('passport')
const jwt = require("jsonwebtoken")

const { SECRET_KEY } = process.env

module.exports = {
    async store(req, res, next) {
        passport.authenticate('local', 
            { session: false }, 
            (err, user, info) => { 
                if (err) { 
                    return res.status(500).json({ success: false, message: err })
                }

                if (!user) { 
                    const { message } = info
                    return res.status(401).json({ success:false, message })
                }
                
                const { _id, _doc: { password, photo, ...rest } } = user
                const token = jwt.sign({ _id }, SECRET_KEY)

                res.json({ success: true, user: {_id, url: photo ? user.urlImage : null , ...rest}, token })

        })(req, res, next)
    },

    async checkToken(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if(err) {
                return res.status(401).json({success: false, message: err.message})
            }
            const user = await User.findById(decoded._id)
            if(!user) return res.status(404).json({success: false, message: 'User Not Exist'}) 
            return res.json({user})
        })
    }
}