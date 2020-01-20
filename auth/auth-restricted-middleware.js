
module.exports = () => {
  return (req, res, next) => {
    console.log(req.session)
  if (!req.session || !req.session.user) {
    return res.status(401).json({ 
      message: 'You Shall Not Pass'
      })
  } 
  next()
  }
}