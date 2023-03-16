import * as React from "react";
import Modal from "react-modal";

type ModalProps = {
  isOpen: boolean,
  children: any,
  style: any,
  className: string,
  overlayClassName: string
}

export default function ModalComponent({ isOpen, children, style, className, overlayClassName }: ModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      style={style}
      className={className}
      overlayClassName={overlayClassName}
    >
      {children}
    </Modal>
  );
}