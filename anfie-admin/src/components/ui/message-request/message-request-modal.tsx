"use client";

import { Button, Form, Input, Modal } from "antd";
import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";

type TProps = {
  messageRequest: TMessageRequest;
  onAccept?: () => void;
  onReject?: () => void;
};

const MessageRequestModal = (
  { messageRequest, onAccept, onReject }: TProps,
  ref: Ref<TModalRef>
) => {
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

  const onFinish = (value: any) => {};

  return (
    <Modal
      onCancel={closeModal}
      open={isModalOpen}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      closeIcon={false}
    >
      <div>
        <h2 className="text-sm text-blue-500 font-semibold capitalize">
          message request:
        </h2>
        <p className="mb-4">{messageRequest?.content}</p>
        <div className="flex gap-4 justify-evenly">
          <Button
            className=""
            type="primary"
            shape="round"
            style={{ backgroundColor: "#87d068" }}
            size="large"
            onClick={onAccept}
          >
            accept
          </Button>
          <Button
            className=""
            type="primary"
            shape="round"
            style={{ backgroundColor: "red" }}
            size="large"
            onClick={onReject}
          >
            reject
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(forwardRef(MessageRequestModal));
