const express = require("express")
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const server = express()
const port = process.env.PORT || 5000

server.use(express.json())

server.use('/auth', authRouter)
server.use('/users', usersRouter)

server.get('/', (req, res, next) => {
  res.json({
    sanityCheck: "Pass"
  })
})

server.use((err, req, res, next) => {
  console.log("Error:", err)
  res.status(500).json({
    message: "Something went wrong"
  })
})

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})