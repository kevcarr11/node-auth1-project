const express = require('express')
const usersModel = require('../users/users-model')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 14)

    req.body.password = hash

    const saved = await usersModel.add(req.body)

    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body
    const user = await usersModel.findBy({ username }).first()

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        message: `Welcome ${user.username}!`,
      })
    } else {
      res.status(401).json({
        message: 'Invalid Credentials'
      })
    }
  } catch (err) {
    next(err)
  }
})


module.exports = router