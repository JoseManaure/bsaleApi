import React, { useState, useEffect } from "react";

import { Table,List, Button, Icon, Modal as ModalAntd, notification } from "antd";
import Modal from "../../../Modal";
import AddEditProductForm from "../AddEditProductForm";
import {
  deleteProductApi,
  getVariantsBsaleApi
} from "../../../../api/stock";

import "./ProductstList.scss";

const { confirm } = ModalAntd;

export default function VariantStocks(props) {
  const { variants, setReloadVariants } = props;
  const [listVariants, setListVariants] = useState([]);

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listVariantArray = [];
    variants.forEach(variant => {
        listVariantArray.push({
        content: (
          <Variant
            variant={variant}
              // deleteProduct={deleteProduct}
              // editProductModal={editProductModal}
          />
        )
      });
    });
    setListVariants(listVariantArray);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants]); 



  const addProductModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo curso");
    setModalContent(
      <AddEditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadVariants={setReloadVariants}
      />
    );
  };


  const editVariantModal = variant => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando producto");
    setModalContent(
      <AddEditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadVariants={setReloadVariants}
        variant={variant}
      />
    );
  };


const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'href',
    key: 'variantValue',
  },
  {
    title: 'Valor',
    dataIndex: 'variantValue',
    key: '3',
  },
];

  const deleteVariant = variant => {

    confirm({
      title: "Eliminando product",
      content: `¿Estas seguro de que quieres eliminar el product ${variant.id}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(variant.id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadVariants(true);
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
        {listVariants.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
              No tienes variant creados
          </h2>
        )} 
            <Table dataSource={variants} columns={columns} />
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
                          
function Variant(props) {
  const {variant, deleteVariant, editVariantModal } = props;
  const [variantData, setVariantData] = useState(null);
  
  useEffect(() => {
    getVariantsBsaleApi(variant.id >= 255).then(response => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `La variante con el id ${variant.id} no se ha encontrado.`
        }); 
      }
      setVariantData(response.data.items);
      console.log(response.data.items);
    });
  }, [variant]);



  if (!variantData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editVariantModal(variant)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deleteVariant(variant)}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      
      <List.Item.Meta
        title={`Variant value:${variantData.variantValue} | ID: ${variantData.id}`}
        description={variantData.description}
      />
    </List.Item>
  );
}

       