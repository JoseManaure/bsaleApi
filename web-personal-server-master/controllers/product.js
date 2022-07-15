const Product = require("../models/product");


function addProduct(req, res) {
  const body = req.body;
  const product = new Product(body);
  product.order = 1000;

  product.save((err, productStored) => {
    if (err) {
      res.status(400).send({ code: 400, message: "El producto que estas creando ya existe." });
    } else {
      if (!productStored) {
        res.status(400).send({ code: 400, message: "No se ha podido crear el producto." });
      } else {
        res.status(200).send({ code: 200, message: "Producto creado correctamente." });
      }
    }
  });
}

async function  getProducts (req, res) {
 const product = await Product.find()
   console.log(product);
   
}

module.exports = {
  addProduct,
  getProducts,
  };
