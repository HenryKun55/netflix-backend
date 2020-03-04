const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/User')
const ObjectId = require('mongoose').ObjectId

const { SECRET_KEY } = process.env

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) { 

        await User.findOne({ email }, (err, user) => { 
            if (err) {
                return done(err)
            }

            if (!user) { 
                return done(null, false, { message: "User doesn't exist" })
            }

            user.compare(password, user.password)
                .then(match => { 

                    if (!match) {
                        return done(null, false, { message: 'Incorrect Password' })
                    }
        
                    return done(null, user)
                })
        })
    }
))

// Você deve definir estas funções, caso use Sessões.
passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    await User.findById({ _id: ObjectId(id) }, (err, user) => { 
        done(err, user)
    })
})

const opts = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

passport.use(new JwtStrategy(opts, async (payload, done) => { 
    await User.findOne({ _id: payload._id }, (err, user) => {         
        if (err) { 
            return done(err, false)
        }

        if (!user) { 
            return done(null, false)
        }

        return done(null, { id: user._id })
    })
}))

module.exports = app => { 
    app.use(passport.initialize())
}