import React, { useState, useEffect } from "react";

import { List, Button, Icon, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditProductForm from "../AddEditProductForm";
import {
  getStocksBsaleApi,
  deleteProductApi,
} from "../../../../api/stock";

import "./ProductstList.scss";

const { confirm } = ModalAntd;

export default function ListStocks(props) {
  const { stocks, setReloadStocks } = props;
  const [listStocks, setListStocks] = useState([]);

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listStockArray = [];
    stocks.forEach(stock => {
        listStockArray.push({
        content: (
          <Stock
            stock={stock}
              // deleteProduct={deleteProduct}
              // editProductModal={editProductModal}
          />
        )
      });
    });
    setListStocks(listStockArray);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks]); 



  const addProductModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo curso");
    setModalContent(
      <AddEditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadStocks={setReloadStocks}
      />
    );
  };


  const editProductModal = stock => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando producto");
    setModalContent(
      <AddEditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadStocks={setReloadStocks}
        stock={stock}
      />
    );
  };

  const deleteProduct = stock => {

    confirm({
      title: "Eliminando product",
      content: `¿Estas seguro de que quieres eliminar el product ${stock.idProduct}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(stock.id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadStocks(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde."
            });
          });
      }
    });
  };
  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addProductModal}>
          Nuevo Stock
        </Button>
      </div>

      <div className="courses-list__items">
        {listStocks.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes stock creados
          </h2>
        )}
        <h1>Lista de Precios BSALE</h1>
        <DragSortableList items={listStocks}  type="vertical" />
        </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
                          
function Stock(props) {
  const {stock, deleteProduct, editProductModal } = props;
  const [stockData, setStockData] = useState(null);
  
  useEffect(() => {
    getStocksBsaleApi(stock.id).then(response => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `El stock con el id ${stock.id} no se ha encontrado.`
        }); 
      }
      setStockData(response.data);
    });
  }, [stock]);



  if (!stockData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editProductModal(stock)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deleteProduct(stock)}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      
      <List.Item.Meta
        title={`${stockData.variantValue} | ID: ${stockData.id}`}
        description={stockData.variantValueWithTaxes}
      />
    </List.Item>
  );
}

       