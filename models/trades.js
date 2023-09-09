// Uncomment the code below to use Sequelize ORM
// const {Sequelize} = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
const mongoose = require('mongoose');

var schema = {
  "type": String,
  "user_id":Number,
  "symbol":String,
  "shares":Number,
  "price":Number,
  "timestamp":Date,
  "id":Number
}
const TradeSchema = new mongoose.Schema(schema);


// Insert your model definition below

module.exports = mongoose.model('Trade', TradeSchema);
