// context/ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null, // 'cart' или 'favorites'
    product: null,
    orderData: null,
    message: ''
  });

  const showModal = (type, product, message = '', orderData = null) => {
    setModal({
      isOpen: true,
      type,
      product,
      message: message || getDefaultMessage(type, product),
      orderData
    });
  };

  const hideModal = () => {
    setModal({
      isOpen: false,
      type: null,
      product: null,
      orderData: null,
      message: ''
    });
  };

  const getDefaultMessage = (type, product) => {
    if (type === 'cart') {
      return `"${product.name}" добавлен в корзину!`;
    } else if (type === 'favorites') {
      return `"${product.name}" добавлен в избранное! ❤️`;
    } else if (type === 'order-success') {
      return 'Заказ успешно оформлен!';
    }
    return '';
  };

  const value = {
    modal,
    showModal,
    hideModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};