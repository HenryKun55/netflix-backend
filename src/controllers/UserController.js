const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10

const { decodeJwt } = require('../util/decode')


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