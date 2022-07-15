import React,{useState, useEffect} from "react";
import StockBsale from "../../components/Admin/Stock/ListStocks/ListStocks"
import {getStocksApi} from "../../api/stock";
import {getProductsApi} from "../../api/product";

export default function Stock() {
  const [stocks, setStocks ] = useState([]);
  const [products, setProducts ] = useState([]);
  const[reloadStocks,setReloadStocks] = useState(false);
  const[reloadProducts,setReloadProducts] = useState(false);

  useEffect(() => {
    getStocksApi().then(response => {
        setStocks(response.items);
        console.log(response.items);
    });
    setReloadStocks(false);
  }, [reloadStocks]);

  useEffect(() => {
    getProductsApi().then(response => {
        setProducts(response.items);
        console.log(response.items);
    });
    setReloadProducts(false);
  }, [reloadProducts]);

  return (
    <div className="clients" >
      <StockBsale stocks={stocks}  products={products} setReloadProducts={setReloadProducts
      } setReloadStocks={setReloadStocks} />
    </div>
  )
}