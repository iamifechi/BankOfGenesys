const jwt = require("jsonwebtoken")
const Users = require("./../models/users")

module.exports = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization || req.headers.Authorization
      if (!token) throw new Error("Token not found")
      const decoded = jwt.decode(token)

      const user = await Users.findById(decoded.user_id)
      if (!user) throw new Error("Unauthorized user")
      req.USER_ID = user._id
      req.token = token
     
      next()
    } catch (error) {
      next(error)
    }
  }
}