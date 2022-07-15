import React, { useState, useEffect } from "react";
import { List, Button, Icon, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditProductForm from "../AddEditProductForm";
import {
  getProductsBsaleApi,
  deleteProductApi,
} from "../../../../api/product";

import "./ProductstList.scss";

const { confirm } = ModalAntd;

export default function ProductsList(props) {
  const { products, setReloadProducts } = props;
  const [listProducts, setListProducts] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listProductArray = [];
    products.forEach(product => {
      listProductArray.push({
        content: (
          <Product
            product={product}
            deleteProduct={deleteProduct}
            editProductModal={editProductModal}
          />
        )
      });
    });
    setListProducts(listProductArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

        
  const addProductModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo curso");
    setModalContent(
      <AddEditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProducts={setReloadProducts}
      />
    );
  };

  const editProductModal = product => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando producto");
    setModalContent(
      <AddEditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProducts={setReloadProducts}
        product={product}
      />
    );
  };

  const deleteProduct = product => {

    confirm({
      title: "Eliminando product",
      content: `¿Estas seguro de que quieres eliminar el product ${product.idProduct}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(product.id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadProducts(true);
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
          Nuevo producto
        </Button>
      </div>

      <div className="courses-list__items">
        {listProducts.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes productos creados
          </h2>
        )}
        <DragSortableList items={listProducts}  type="vertical" />
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

function Product(props) {
  const { product, deleteProduct, editProductModal } = props;
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    getProductsBsaleApi(product.id).then(response => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `El producto con el id ${product.id} no se ha encontrado.`
        }); 
      }
      setProductData(response.data);
    });
  }, [product]);

  if (!productData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editProductModal(product)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deleteProduct(product)}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      
      <List.Item.Meta
        title={`${productData.name} | ID: ${productData.id}   `}
        description={productData.ledgerAccount}
      />
    </List.Item>
  );
}
