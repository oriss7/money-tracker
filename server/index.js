const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Transaction = require('./models/Transaction.js')

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

const dbUrl = 'mongodb+srv://money:97qzpLFvMiQuxQJC@cluster0.bcjiu7l.mongodb.net/money-tracker?retryWrites=true&w=majority&appName=Cluster0'

app.get('/api/test', (req, res) => {
	res.json('test ok2')
})

app.post('/api/transaction', async (req, res) => {
	await mongoose.connect(dbUrl)
	const {description, datetime, price} = req.body
	const transaction = await Transaction.create({description,datetime,price})
	res.json(transaction)
})

app.get('/api/transactions', async (req, res) => {
	await mongoose.connect(dbUrl)
	const transactions = await Transaction.find()
	res.json(transactions)
})

app.listen(4040)