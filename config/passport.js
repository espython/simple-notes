
import PassportJwt from 'passport-jwt'
import { config } from 'dotenv'
import { User } from '../models'

const JwtStrategy = PassportJwt.Strategy
const ExtarctJwt = PassportJwt.ExtractJwt

config()

const opts = {}
opts.jwtFromRequest = ExtarctJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET

export default function passportConfig (passport) {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
    })
  )
}
