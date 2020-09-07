const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = req.session.user
  res.send(req.session.user)
//   if (isLoggedIn) next()
//   else res.redirect('login')
}

module.exports = checkLoggedIn