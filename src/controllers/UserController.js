const User = require('../models/User')
const passport = require('passport')
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require("jsonwebtoken")
const { decodeJwt } = require('../util/decode')

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

                    const { _doc: { password, ...rest } } = newUser
        
                    return res.json({ success: true, user: {...rest} })
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
                
                const { _id, _doc: { password, photo, ...rest } } = user
                console.log(user);
                const token = jwt.sign({ _id }, SECRET_KEY)

                res.json({ success: true, user: {_id, url: user.urlImage, ...rest}, token })

        })(req, res, next)
    }

    async checkToken(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if(err) {
                res.json({err})
            }
            const user = await User.findById(decoded._id)
            res.json({user})
        })
    }

    async update(req, res) {
        const token = req.headers.authorization.replace('Bearer ', '')
        const _id = decodeJwt(token)

        if(_id) {

            const user = await User.findById(_id)
            
            user.photo = req.file.key
            await user.save()
            
            return res.json({success: true, user})
        }

        return res.json({success: false})
    }

}

module.exports = new UserController()