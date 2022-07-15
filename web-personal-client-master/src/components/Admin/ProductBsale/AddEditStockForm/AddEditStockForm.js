import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, notification, message } from "antd";

import { addStockApi, updateStockApi } from "../../../../api/stock";
import "./AddEditProductForm.scss";

export default function AddEditProductForm(props) {
  const { setIsVisibleModal, setReloadStocks, stock } = props;
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    stock ? setStockData(stock) : setStockData({});
  }, [stock]);

  const addStock= e => {
    e.preventDefault();

    if (!stockData.id) {
      notification["error"]({
        message: "El id del producto es obligatorio"
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
          placeholder="ID del curso"
          value={stockData.id}
          onChange={e =>
            setStockData({ ...stockData, id: e.target.value })
          }
          disabled={stock ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="nombre del producto"
          value={stockData.name}
          onChange={e =>
            setStockData({ ...stockData, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="Permite decimal"
          value={stockData.allowDecimal}
          onChange={e =>
            setStockData({ ...stockData, allowDecimal: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="gift" />}
          placeholder="Controla Stock?"
          value={stockData.stockControl}
          onChange={e =>
            setStockData({ ...stockData, stockControl: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="dollar" />}
          placeholder="Tipo de producto?"
          value={stockData.productTypeId}
          onChange={e =>
            setStockData({ ...stockData, productTypeId: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="dollar" />}
          placeholder="0 activo, 1 inactivo"
          value={stockData.state}
          onChange={e =>
            setStockData({ ...stockData, state: e.target.value })
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
