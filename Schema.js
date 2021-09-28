const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
})

module.exports = Schema;