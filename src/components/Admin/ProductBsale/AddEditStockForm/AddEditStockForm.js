import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, notification, message } from "antd";

import { addProductApi, updateProductApi } from "../../../../api/product";
import { addProductApi, updateProductApi } from "../../../../api/stock";
import "./AddEditProductForm.scss";

export default function AddEditProductForm(props) {
  const { setIsVisibleModal, setReloadProducts, product } = props;
  const [productData, setProductData] = useState({});

  useEffect(() => {
    product ? setProductData(product) : setProductData({});
  }, [product]);

  const addProduct= e => {
    e.preventDefault();

    if (!productData.id) {
      notification["error"]({
        message: "El id del producto es obligatorio"
      });
    } else {
      addProductApi(productData)
        .then(response => {
    const typeNotification = response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message
          });
          setIsVisibleModal(false);
          setProductData({});
          setReloadProducts();
          setReloadProducts(true);
          

        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde."
          });
        });
    }
  };

  const updateProduct = e => {
    e.preventDefault();

    updateProductApi(product.id, productData)
      .then(response => {
       
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
        
          message: response.message
        });
        console.log(response);
        setIsVisibleModal(false);
        setProductData({});
        setReloadProducts(true);
       
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, intentelo más tarde."
        });
      });
  };

  return (
    <div className="add-edit-course-form">
      <AddEditForm
        product={product}
        addProduct={addProduct}
        updateProduct={updateProduct}
        productData={productData}
        setProductData={setProductData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { product, addProduct, updateProduct, productData, setProductData } = props;

  return (
    <Form
      className="form-add-edit"
      onSubmit={product ? updateProduct : addProduct}
    >
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="ID del curso"
          value={productData.id}
          onChange={e =>
            setProductData({ ...productData, id: e.target.value })
          }
          disabled={product ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="nombre del producto"
          value={productData.name}
          onChange={e =>
            setProductData({ ...productData, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="Permite decimal"
          value={productData.allowDecimal}
          onChange={e =>
            setProductData({ ...productData, allowDecimal: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="gift" />}
          placeholder="Controla Stock?"
          value={productData.stockControl}
          onChange={e =>
            setProductData({ ...productData, stockControl: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="dollar" />}
          placeholder="Tipo de producto?"
          value={productData.productTypeId}
          onChange={e =>
            setProductData({ ...productData, productTypeId: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="dollar" />}
          placeholder="0 activo, 1 inactivo"
          value={productData.state}
          onChange={e =>
            setProductData({ ...productData, state: e.target.value })
          }
        />
      </Form.Item>
     
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {product ? "Actualizar producto" : "Crear producto"}
        </Button>
      </Form.Item>
    </Form>
  );
}
