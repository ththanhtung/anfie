"use client";
import { Button, Form, Input, Modal } from "antd";
import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
import UploadImage from "@/components/upload/upload-image";
import { useMutationPost } from "@/hooks";
type TProps = {
  onReport: (value: any) => void;
  isLoading?: boolean;
};
const ReportModal = ({ onReport, isLoading }: TProps, ref: Ref<TModalRef>) => {
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

  const onFinish = (value: any) => {
    onReport(value);
  };

  return (
    <Modal
      onCancel={closeModal}
      open={isModalOpen}
      title="Report"
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
            placeholder="What’s happening?"
            className="mb-2"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isLoading}>
          Report
        </Button>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(ReportModal));
