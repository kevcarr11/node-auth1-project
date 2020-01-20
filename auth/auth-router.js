const bcrypt = require('bcryptjs')
const express = require('express')
const restricted = require('../auth/auth-restricted-middleware')
const userCheck = require('../middleware/user.js')
const usersModel = require('../users/users-model')

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {

    const saved = await usersModel.add(req.body)

    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

router.post('/login', userCheck(), (req, res, next) => {
  req.session.user = req.body
  res.status(200).json({
    message: `Welcome ${req.body.username}!`,
  })
})

  router.get("/logout", restricted(), (req, res, next) => {
    // deletes the session on the server, but not the client's cookie.
    // we can't force the client to delete the cookie, it just becomes useless to them.
    req.session.destroy((err) => {
      if (err) {
        next(err)
      } else {
        res.json({
          message: "You are logged out",
        })
      }
    })
  })

  module.exports = router