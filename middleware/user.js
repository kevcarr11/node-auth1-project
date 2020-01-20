const usersModel = require('../users/users-model')
const bcrypt = require('bcryptjs')

module.exports = () => {
  return async (req, res, next) => {
    try {
      const {username, password} = req.body
      let user = await usersModel.findBy({ username }).first()
      
      if (!user) {
        return res.status(401).json({
          message: "Invalid Credentials"
        })
      }
      
      const passwordValid = await bcrypt.compare(password, user.password)
     
      if (!passwordValid) {
        return res.status(401).json({
          message: "Invalid Credentials"
        })
      }

      if (user && passwordValid) {
       req.body = user
      } 
      next()
    } catch (err) {
      next(err)
    }
    
  }
}