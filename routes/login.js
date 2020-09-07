const db = require('../models')
const bcrypt = require('bcrypt')

const get = (req, res) => {
  res.render('pages/login')
}

const post = async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.body.email }})

  if(user && bcrypt.compareSync(req.body.password, user.dataValues.password)){
    req.session.user = 'user'
    req.session.save(() => res.redirect('/'))
    // res.send(user)

  }else {
    res.redirect('/login')
  }
}

module.exports = {
  get,
  post
}