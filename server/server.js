const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const redis = require('redis')
const RedisServer = require('redis-server')
const app = express()
const port = process.env.PORT || 3000
const RedisPort = 6375

const routes = require('./api/index')

const server = new RedisServer(6379)

server.open((err) => {
	if (err === null) {
		console.log('Redis server started on: ' + RedisPort)
	} else {
		console.log('Redis server not started. Error ' + err)
	}
})

const redisClient = redis.createClient()
const RedisStore = require('connect-redis')(session)

app.use(session({
	store: new RedisStore({ client: redisClient }),
	secret: 'gBpwmwE0PmyDKPuLhhmY8CONJQW3TnCujQuoE8nVao',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))

redisClient.on('error', function (err) {
	console.log('Error ' + err)
})

redisClient.on('connect', function () {
	console.log('Connect to redis server')
})

const allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Origin', req.headers.origin)
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')

	next()
}

app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes)

app.listen(port)

console.log('Server started on: ' + port)
