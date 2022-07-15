import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, notification, message } from "antd";

import { addStockApi, updateStockApi } from "../../../../api/stock";

import "./AddEditProductForm.scss";

export default function AddEditStockForm(props) {
  const { setIsVisibleModal, setReloadStocks, stock } = props;
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    stock ? setStockData(stock) : setStockData({});
  }, [stock]);

  const addStock= e => {
    e.preventDefault();

    if (!stockData) {
      notification["error"]({
        message: "No se encuentra la Data del Stock"
      });
    } else {
      addStockApi(stockData)
        .then(response => {
    const typeNotification = response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message
          });
          setIsVisibleModal(false);
          setStockData({});
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

    updateStockApi(stock.id, stockData)
      .then(response => {
       
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
        
          message: response.message
        });
        console.log(response);
        setIsVisibleModal(false);
        setStockData({});
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
        stock={stock}
        addStock={addStock}
        updateStock={updateStock}
        stockData={stockData}
        setStockData={setStockData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { stock, addStock, updateStock, stockData, setStockData } = props;

  return (
    <Form
      className="form-add-edit"
      onSubmit={stock ? updateStock : addStock}
    >
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="Cantidad"
          value={stockData.quantity}
          onChange={e =>
            setStockData({ ...stockData, quantity: e.target.value })
          }
          disabled={stock ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="Cantidad disponible"
          value={stockData.quantityAvailable}
          onChange={e =>
            setStockData({ ...stockData, quantityAvailable: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="Variant"
          value={stockData.variant}
          onChange={e =>
            setStockData({ ...stockData, variant: e.target.value })
          }
        />
      </Form.Item>
     
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {stock ? "Actualizar producto" : "Crear producto"}
        </Button>
      </Form.Item>
    </Form>
  );
}


