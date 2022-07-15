const Stock = require("../models/stock");

async function  getStocks (req, res) {
 const stock = await Stock.find()
   console.log(stock);
}

function addStock(req, res) {
  const body = req.body;
  const stock = new Stock(body);

  stock.save((err, stockStored) => {
    if (err) {
      res.status(400).send({ code: 400, message: "El producto que estas creando ya existe." });
    } else {
      if (!stockStored) {
        res.status(400).send({ code: 400, message: "No se ha podido crear el producto." });
      } else {
        res.status(200).send({ code: 200, message: "Producto creado correctamente." });
      }
    }
  });
}

module.exports = {
    getStocks,
    addStock
  };
