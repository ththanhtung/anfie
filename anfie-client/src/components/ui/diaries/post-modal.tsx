"use client";
import {
  CalendarOutlined,
  CameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Modal } from "antd";
import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
import AddPostInteractionBar from "./add-post-interaction-bar";

type TProps = {
  onCreatePost: () => void;
};
const PostModal = ({ onCreatePost }: TProps, ref: Ref<TModalRef>) => {
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
      <Form>
        <Form.Item>
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 12 }}
            placeholder="What’s happening?"
            className="mb-2"
          />
        </Form.Item>
        <div className="text-blue-500 flex items-center mb-2">
          Everyone can reply
        </div>
        <div className="flex justify-between items-center">
          <AddPostInteractionBar />
          <div className="flex items-center">
            <Button type="primary" htmlType="submit" onClick={onCreatePost}>
              Post
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(PostModal));
