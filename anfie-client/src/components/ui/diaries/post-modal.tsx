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
  groupId: string;
};
const PostModal = ({ groupId }: TProps, ref: Ref<TModalRef>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onCreatePost, isCreatePostPending } = useMutationPost();

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
    console.log({ value });

    const { medias, content } = value;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("groupId", groupId);
    
    if (medias && medias?.length > 0) {
      medias?.forEach((media: any) => {
        formData.append("medias", media?.originFileObj);
      });
    }
    onCreatePost({ form: formData, cb: closeModal });
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
            placeholder="What’s happening?"
            className="mb-2"
          />
        </Form.Item>
        <div className="flex justify-between items-center">
          <Form.Item name="medias">
            <UploadImage />
          </Form.Item>
          <div className="flex items-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreatePostPending}
            >
              Post
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(PostModal));
