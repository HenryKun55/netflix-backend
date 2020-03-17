const User = require('../models/User')
const passport = require('passport')
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require("jsonwebtoken")

const { SECRET_KEY } = process.env

class UserController {
    
    async store(req, res) {
        const { password, name, email } = req.body

        bcrypt.hash(password, saltRounds)
            .then(async (hash) => {
                await User.create({ name, email, password: hash }, (err, newUser) => { 
                    if (err) { 
                        return res.status(200).json({ success: false, message: err.message })
                    }
        
                    return res.json({ success: true, user: newUser})
                })
            })
    }

    async login(req, res, next) {
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
                
                const { _id, _doc: { password, ...rest } } = user
                const token = jwt.sign({ _id }, SECRET_KEY)

                res.json({ success: true, user: {_id, ...rest}, token })

        })(req, res, next)
    }

    async checkToken(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if(err) {
                res.json({err})
            }
            res.json({decoded})
        })
    }


    async show(req, res, next) {
        const token = req.headers.authorization.replace('Bearer ', '')
        res.json({ token })
    }

}

module.exports = new UserController()