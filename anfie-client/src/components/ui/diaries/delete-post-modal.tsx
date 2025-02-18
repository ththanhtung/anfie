"use client";
import { Modal } from "antd";
import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
type TProps = {
  onOk: () => void;
  isLoading?: boolean;
};
const DeletePostModal = ({ onOk, isLoading }: TProps, ref: Ref<TModalRef>) => {
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
      onCancel={closeModal}
      open={isModalOpen}
      title="Are you sure to delete this post?"
      cancelText="No"
      okText="Yes"
      confirmLoading={isLoading}
      onOk={onOk}
    >
      <p className="h-5">
        This post will be deleted and you cannot access this post anymore
      </p>
      <p className="!font-medium !text-neutral_900 mt-4 h-5">
        Are you sure you want to delete this post?
      </p>
    </Modal>
  );
};

export default memo(forwardRef(DeletePostModal));
