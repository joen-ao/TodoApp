import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modalContent">
        <AiOutlineClose
          size={30}
          color="#000"
          onClick={closeModal}
          cursor="pointer"
          className="closeIcon"
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
