const express = require('express')
const app = express()

const config = require('./config')
const login = require('./routes/login')
const checkLoggedIn = require('./helpers/checkLoggedIn')

const hbs = require('express-hbs');
const bodyParser = require('body-parser')

const session = require('express-session')
const sessionStore = require('express-session-sequelize')
const SessionStore = sessionStore(session.Store);

const db = require('./models')

const users = require('./routes/users')

const sequelizeSessionStore = new SessionStore({
  db: db.sequelize
});


app.use(session({
  secret: 'anystringvalue',
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  resave: false,
  store: sequelizeSessionStore
}))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/components',
  defaultLayout: __dirname + '/views/layouts/default',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.get('/login', login.get)
app.post('/login', login.post)

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('login')
  })
})

app.get('/', (req, res) => {
  res.redirect('login')
})

app.get('/dashboard', checkLoggedIn, (req, res) => {
  res.render('pages/dashboard')
})

app.get('/users', users.list)
app.get('/users/new', users.new_get)
app.post('/users/new', users.new_post)
app.get('/users/:id', users.details)

app.listen(config.port, () => {
  console.log('Server running at port '+ config.port);
})
