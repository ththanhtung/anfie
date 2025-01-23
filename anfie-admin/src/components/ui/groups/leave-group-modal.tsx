"use client";
import { AFSelectInfinite, BlockFormItem } from "@/components";
import { useListInfiniteFriends } from "@/hooks";
import { userInfoStoreAtom } from "@/stores";
import { Button, Form, Input, Modal } from "antd";
import { useAtomValue } from "jotai";
import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
type TProps = {
  onOk?: () => void;
};
const LeaveGroupModal = ({ onOk }: TProps, ref: Ref<TModalRef>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useAtomValue(userInfoStoreAtom);

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
      width={400}
      okText="Leave"
      onOk={onOk}
    >
      <p>{`All of your messages in this group will be deleted`}</p>
      <p className="!font-medium !text-neutral_900 mt-4">
        Are you sure you want to leave ?
      </p>
    </Modal>
  );
};

export default memo(forwardRef(LeaveGroupModal));
