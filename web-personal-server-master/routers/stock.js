const express = require("express");

const StockController = require("../controllers/stock");


const api = express.Router();

api.get("/stock", StockController.getStocks);
   
api.post("/add-stocks",StockController.addStock);

module.exports = api;
