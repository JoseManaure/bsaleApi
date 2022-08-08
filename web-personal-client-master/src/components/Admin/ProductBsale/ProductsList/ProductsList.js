import React, { useState, useEffect } from "react";
import { Table,List, Button, Icon, Modal as ModalAntd, notification } from "antd";
// import DragSortableList from "react-drag-sortable";
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
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [productData, setProductData] = useState(null);

useEffect(() => {
  products.forEach(product => {
  getProductsBsaleApi(product.id)
    .then(response => {
    if (response.code !== 200) {
      notification["warning"]({
        message: `El producto con el id ${product.id} no se ha encontrado.`
      }); 
      }
      setProductData(response.data);
      console.log(response.data.product_taxes87                                                                                                                                                                                    );
      });
    });
}, [products]);

if (!productData) {
  return null;
}
  // useEffect(() => {
  //   const listProductArray = [];
  //   products.forEach(product => {
  //     listProductArray.push({
  //       content: (
  //         <Product
  //           product={product}
  //           deleteProduct={deleteProduct}
  //           editProductModal={editProductModal}
  //         />
  //       )
  //     });
  //   });
  //   setListProducts(listProductArray);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [products]);

        
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

  const editProductModal = productData => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando producto");
    setModalContent(
      <AddEditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProducts={setReloadProducts}
        product={productData}
      />
    );
  };

  const deleteProduct = productData => {

    confirm({
      title: "Eliminando product",
      content: `¿Estas seguro de que quieres eliminar el product ${productData.idProduct}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(productData.id)
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
  
  const columns = [
    {
    title: 'ID',
    dataIndex: 'id',
    key: '  id',
    render: titulo => <a href="post/feed">{titulo}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Acciones',
    key: 'Action',
    render: (product) =>{
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
    
  </List.Item>
      )
    }
  }
];

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addProductModal}>
          Nuevo producto
        </Button>
      </div>

      <div className="courses-list__items">
        {productData.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes productos creados
          </h2>
        )}
         <Table dataSource={products} columns={columns} pagination={true} />
        {/* <DragSortableList items={listProducts}  type="vertical" /> */}
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


