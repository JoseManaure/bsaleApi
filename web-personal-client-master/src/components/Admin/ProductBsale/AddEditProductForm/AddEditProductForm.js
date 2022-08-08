import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, notification, message, Row,
  Col, } from "antd";

import { addStockApi, updateStockApi } from "../../../../api/stock";
import "./AddEditProductForm.scss";

export default function AddEditProductForm(props) {
  const { setIsVisibleModal, setReloadStocks, product } = props;
  const [productData, setProductData] = useState({});

  useEffect(() => {
    product ? setProductData(product) : setProductData({});
  }, [product]);

  const addStock = e => {
    e.preventDefault();
    if (!productData.id) {
      notification["error"]({
        message: "El id del producto es obligatorio"
      });
    } else {
      addStockApi(productData)
        .then(response => {
    const typeNotification = response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message
          });
          setIsVisibleModal(false);
          setProductData({});
          setReloadStocks();
          setReloadStocks(true);
          

        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde."
          });
        });
    }
  };

  const updateStock = e => {
    e.preventDefault();
    updateStockApi(product.id, productData)
    .then(response => {
    const typeNotification = response.code === 200 ? "success" : "warning";
    notification[typeNotification]({
        message: "response.code"
    })
        setIsVisibleModal(false);
        setProductData({});
        setReloadStocks(true);
      
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
        addStock={addStock}
        updateStock={updateStock}
        productData={productData}
        setProductData={setProductData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { product, addStock, updateStock, productData, setProductData } = props;
  return (
    <Form
      className="form-add-edit" onSubmit={product ? updateStock : addStock}>
      <Row gutter={24}>
      <Col span={12}>
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="ID del producto"
          value={productData.id}
          onChange={e =>
            setProductData({ ...productData, id: e.target.value })
          }
          disabled={product ? true : false}
        />
      </Form.Item>    
      </Col>
      <Row gutter={24}>
        <Col span={24}>
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
      </Col>
      </Row>
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="Descripcion del producto"
          value={productData.description}
          onChange={e =>
            setProductData({ ...productData, description: e.target.value })
          }
        />
      </Form.Item> 
      </Row>
      <Row gutter={24}>
      <Col span={12}>
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
      </Col>
      <Col span={12}>
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
      </Col>
      </Row>
      <Row gutter={24}>
      <Col span={12}>
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
      </Col>
      <Col span={12}>
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
      </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {product ? "Actualizar producto" : "Crear producto"}
        </Button>
      </Form.Item>
    </Form>
    
  );
}
