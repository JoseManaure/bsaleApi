const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = Schema({
 id: Number,
 quantity: Number,
 quantityReserved: String,
 quantityAvailable:Number,
});

module.exports = mongoose.model("Stock", StockSchema);
