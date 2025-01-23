'use client'

import React, {
  ReactNode,
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
import { Modal, ModalProps } from "antd";
interface IProps extends ModalProps {
  children: ReactNode;
  title: string;
}

function AFModal({ children, title, ...props }: IProps, ref: Ref<TModalRef>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      showModal,
      closeModal,
    }),
    []
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      closable={false}
      onCancel={closeModal}
      open={isModalOpen}
      cancelButtonProps={{
        className: "!px-8 !font-medium",
        style: {
          borderColor: "#E6E6E6",
          color: "#848484",
        },
      }}
      okButtonProps={{
        className: "!px-8 !font-medium",
      }}
      {...props}
    >
      <div className="spacing-main flex-between">
        <p className="text-xl font-semibold">{title}</p>
        <span
          className="icon-close cursor-pointer text-neutral_700"
          onClick={closeModal}
        />
      </div>
      <div className="spacing-main border-y">{children}</div>
    </Modal>
  );
}

export default memo(forwardRef(AFModal));
