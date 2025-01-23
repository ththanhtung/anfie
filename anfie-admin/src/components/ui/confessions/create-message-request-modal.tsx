"use client";
import { useMutationMessageRequest } from "@/hooks";
import { Button, Form, Input, Modal } from "antd";
import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";

type TProps = {
  confession: TConfession;
};

const CreateMessageRequestModal = ({ confession }: TProps, ref: Ref<TModalRef>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      showModal,
      closeModal,
    }),
    []
  );

  const { onCreateMessageRequest, isCreateMessageRequestPending } =
    useMutationMessageRequest();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onFinish = (value: any) => {
    console.log({ confession });
    onCreateMessageRequest({
      form: { ...value, confessionId: confession.id.toString() },
      cb: closeModal,
    });
  };

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
      <Form onFinish={onFinish}>
        <Form.Item name="content">
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 12 }}
            placeholder="Hey, your confession is...."
            className="mb-2"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full capitalize"
          loading={isCreateMessageRequestPending}
        >
          send message
        </Button>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(CreateMessageRequestModal));
