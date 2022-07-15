const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
 id: Number,
name: String,
description: String,
allowDecimal:Number,
ledgerAccount: String,
costCenter:String,
stockControl: Number,
productTypeId:Number
});

module.exports = mongoose.model("Product", ProductSchema);
