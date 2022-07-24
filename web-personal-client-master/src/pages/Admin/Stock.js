import React,{useState, useEffect} from "react";
import StockBsale from "../../components/Admin/Stock/ListStocks/ListStocks"
import VariantBsale from "../../components/Admin/Stock/VariantStocks"
import {getStocksApi, getVariantsApi} from "../../api/stock";
import { Breadcrumb, Layout, Col,Row,Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

export default function Stock() {

  const { Header, Content, Footer, Sider } = Layout;
  
    


  const [stocks, setStocks ] = useState([]);
  const [variants, setVariants ] = useState([]);
  const[reloadStocks,setReloadStocks] = useState(false);
  const[reloadVariants,setReloadVariants] = useState(false);
  
  useEffect(() => {
    getStocksApi().then(response => {
        setStocks(response.items);
        console.log(response.items);
    });
    setReloadStocks(false);
  }, [reloadStocks]);

    
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
          <p>  <StockBsale stocks={stocks}  setReloadStocks={setReloadStocks} /> <br></br>
 <br></br>
 <VariantBsale variants={variants}  setReloadVariants={setReloadVariants} />
</p>  
         
        </div>
    
</div>




    //  <Row>
//   <Col span={22} push={6}>
//       <Content>
//       </Content>
//   </Col>
//  </Row>
  )
}