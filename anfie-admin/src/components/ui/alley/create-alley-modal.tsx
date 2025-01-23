"use client";
import { Button, Form, Input, Modal, Typography } from "antd";
import React, {
  Ref,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { useListInfinityTags, useMutationTag } from "@/hooks";
import AfSelectInfinite from "@/components/core/af-select-infinite";
import { DefaultOptionType } from "antd/es/select";
import { useMutationAlley } from "@/hooks/alleys";

type TProps = {
  parentId: string;
};

const CreateAlleyModal = ({ parentId }: TProps, ref: Ref<TModalRef>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onCreateAlley, isCreateAlleyPending } = useMutationAlley();

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

  const onFinish = (value: any) => {
    onCreateAlley({ form: { ...value, parentId }, cb: closeModal });
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
        <Typography.Title level={5}>Create New Alley</Typography.Title>
        <Form.Item name="title">
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 12 }}
            placeholder="Alley Name"
            className="mb-2"
          />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 12 }}
            placeholder="Alley Description"
            className="mb-2"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isCreateAlleyPending}
        >
          Create
        </Button>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(CreateAlleyModal));
