import React,{useState, useEffect} from "react";
import StockBsale from "../../components/Admin/Stock/ListStocks/ListStocks"
import PricesListBsale from "../../components/Admin/Stock/VariantStocks"
import {getStocksApi, getVariantsApi} from "../../api/stock";
import { Breadcrumb, Layout, Col,Row,Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function Stock() {
  // const [stocks, setStocks ] = useState([]);
  const [variants, setVariants ] = useState([]);
  // const[reloadStocks,setReloadStocks] = useState(false);
  const[reloadVariants,setReloadVariants] = useState(false);
  
  // useEffect(() => {
  //   getStocksApi().then(response => {
  //       setStocks(response.items);
  //       console.log(response.items);
  //   });
  //   setReloadStocks(false);
  // }, [reloadStocks]);

  useEffect(() => {
    getVariantsApi().then(response => {
        setVariants(response.items);
        console.log(response.items);
    });
    setReloadVariants(false);
  }, [reloadVariants]);
  return (
    <div>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            textAlign: 'center',
          }}
        >
    {/* <StockBsale stocks={stocks}  setReloadStocks={setReloadStocks} /> <br></br> */}
    <PricesListBsale variants={variants}  setReloadVariants={setReloadVariants} />
        </div>
</div>

  )
}