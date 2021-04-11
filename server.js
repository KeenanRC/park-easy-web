/** Read Strings */
const strings = require('./strings.json')

/** Cloud Foundry Dependencies */
const cfenv = require('cfenv')
const appEnv = cfenv.getAppEnv()

/** Express Setup */
const express = require('express')
const app = express()

app.use(express.static(__dirname))

const bodyParser = require('body-parser')
const expressSession = require('express-session')({
    // Salt
    secret: 'parkeasy',
    resave: false,
    saveUninitialized: false
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession)

app.listen(appEnv.port, appEnv.bind, () => console.log(strings.SERVER_STARTED, appEnv.bind, ':', appEnv.port))

/** Passport Setup */
const passport = require('passport')

app.use(passport.initialize())
app.use(passport.session())

/** Mongoose Setup */
const mongoConnect = require('./mongo-connect')

/** Connect Ensure Login */
const connectEnsureLogin = require('connect-ensure-login')

/** Routes */
const userRoute = require('./routes/userRoute')
app.use('/', userRoute)

const htmlRoute = require('./routes/htmlRoute')
app.use('/', htmlRoute)

app.post('/register', (req, res) => {
    mongoConnect.UserDetails.register({ username: req.body.username, active: false }, req.body.password, (err) => {
        if (err) {
            return res.redirect('/register?info=' + err.message)
        }
        return res.redirect('/register?info=' + 'successful')
    })
})