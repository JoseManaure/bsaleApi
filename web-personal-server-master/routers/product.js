const express = require ("express");
const ProductController = require ("../controllers/product");


const md_auth = require("../middlewares/authenticated");

const api = express.Router();

  
api.post("/add-products",[md_auth.ensureAuth],ProductController.addProduct);
api.get("/get-products", ProductController.getProducts);


module.exports = api;
