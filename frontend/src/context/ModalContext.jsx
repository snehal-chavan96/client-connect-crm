import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({});

  const openModal = useCallback((id, data = null) => {
    setModals(prev => ({ ...prev, [id]: { isOpen: true, data } }));
  }, []);

  const closeModal = useCallback((id) => {
    setModals(prev => ({ ...prev, [id]: { isOpen: false, data: null } }));
  }, []);

  const isOpen = useCallback((id) => {
    return modals[id]?.isOpen || false;
  }, [modals]);

  const getData = useCallback((id) => {
    return modals[id]?.data || null;
  }, [modals]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, getData }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};
