const db = require('../models')
const { v4: uuidv4 } = require('uuid');

const list = (req, res) => {
  const data = {data : 'These are users data'}

  res.render('pages/users/list', { data })
}

const new_get = (req, res) => {
  res.render('pages/users/new')
}

const new_post = (req, res) => {
  res.send(req.body)
  // const avatar = ''
  // const data = req.body

  // if(req.files && req.files.avatar){
  //   const upload = req.files.avatar
  //   let nameArr = upload.splice('.')
  //   const ext = '.' + nameArr[nameArr.length - 1]

  //   avatar = uuidv4() + ext
  //   upload.mv(__dirname + '/uploads')
  // }


  // console.log(data)
  // data.avatar = avatar
  // const user = await db.User.create(data)

  // if(user) res.redirect('/user/' + user.id)
  // else res.send('Failed')

}

const details = async (req, res) => {
  const data = await db.user.findOne({where: {id: req.params.id }})

  res.render('/pages/users/details', data)
}

module.exports = {
  list,
  new_get,
  new_post,
  details
}