import React,{useState, useEffect} from "react";
import ProductsBsale from "../../components/Admin/ProductBsale/ProductsList";
import {getProductsApi} from "../../api/product";

export default function Products (){
  const [products, setProducts ] = useState([]);
  const[reloadProducts,setReloadProducts] = useState(false);

  useEffect(() => {
    getProductsApi().then(response => {
      setProducts(response.items);
      setReloadProducts(false);
    });
  }, [reloadProducts]);


  return (
    <div className="clients" >
      <ProductsBsale products={products} setReloadProducts={setReloadProducts} />
      {/* <Table dataSource={products} columns={columns} />; */}
    </div>
  )
}