const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const TransactionSchema = new Schema({
	price: {type: Number, required: true},
	description: {type: String, required: true},
	datetime: {type: Date, required: true}
})

const TransactionModel = model('Transaction', TransactionSchema)

module.exports = TransactionModel