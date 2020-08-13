const request = require("superagent")
const passport = require("passport")
const passportJWT = require("passport-jwt")
const bcrypt = require("bcrypt")
const JwtStrategy = passportJWT.Strategy
const extractJwt = passportJWT.ExtractJwt

const config = require("./config.json")
const db = require("./db.js")


const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
}

module.exports = () => {

  const strategy = new JwtStrategy(options, (payload, next) => {
    const user = null
    next(null, user)
  })

  passport.use(strategy)

  return {
    initialize: () => {
      return passport.initialize()
    },

    authenticate: () => {
      return passport.authenticate("jwt", config.jwt.jwtSession)
    }
  }

}
