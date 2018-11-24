const express = require('express')
const redis = require('redis')
const moment = require('moment')
const client = redis.createClient()
const router = express.Router()

const { promisify } = require('util')

router.post('/api/addData', function (req, res) {
	const { body: {text, title}, date } = req

	const lpushAsyncData = promisify(client.lpush).bind(client)
	const lpushAsyncLogs = promisify(client.lpush).bind(client)

	Promise.all(
		[
			lpushAsyncData('_data', JSON.stringify({ text, title })),
			lpushAsyncLogs('_logs', JSON.stringify({ type: 'addData', date }))
		]
	)
		.then(() => {
			res.send({status: 'success'})
		})
		.catch(err => res.send({status: 'error', err}))
})

router.get('/api/logs', function (req, res) {
	let result = {}
	client.lrange('_logs', 0, -1, (err, val) => {
		if (err) {
			result.getErr = err
		}

		result = val.reduce((acc, el) => {
			let item = JSON.parse(el)
			acc.push({ type: item.type, date: moment(item.date).format('D.MM.YYYY, HH:mm:ss') })
			return acc
		}, [])

		res.send({ result })
	})
})

router.post('/api/logs', function (req, res) {
	const { body } = req

	client.lpush('_logs', JSON.stringify(body), function (err, val) {
		if (err) {
			res.send({err})
			return false
		} else {
			res.send(body)
		}
	})
})

router.get('/api/data', function (req, res) {
	let result = {}
	client.lrange('_data', 0, -1, (err, val) => {
		if (err) {
			result.getErr = err
		}

		result.data = val.reduce((acc, el) => {
			let item = JSON.parse(el)
			acc.push({ title: item.title, text: item.text })
			return acc
		}, [])

		res.send({ result })
	})
})

module.exports = router
