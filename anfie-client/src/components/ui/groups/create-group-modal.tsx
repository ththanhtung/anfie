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
  onCreate?: (title: string, userIds: string[]) => void;
};
const CreateGroupModal = ({ onCreate }: TProps, ref: Ref<TModalRef>) => {
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

  const {
    fetchNextPage: fetchNextPageFriends,
    total: totalFriends,
    isFetchingNextPage: isFetchingNextPageFriends,
    isLoading: isLoadingFriends,
    friendOptions,
  } = useListInfiniteFriends();

  const onFinish = (value: any) => {
    onCreate?.(value.title, [...value?.friends, currentUser.userId.toString()] ?? []);
  };

  return (
    <Modal
      onCancel={closeModal}
      open={isModalOpen}
      width={400}
      closeIcon={false}
      footer={null}
    >
      <Form onFinish={onFinish}>
        <BlockFormItem label="Group Name">
          <Form.Item name="title">
            <Input placeholder="Group Name" className="w-full" />
          </Form.Item>
        </BlockFormItem>
        <BlockFormItem label="Select Group Members">
          <Form.Item name="friends">
            <AFSelectInfinite
              allowClear
              options={friendOptions}
              loadMore={fetchNextPageFriends}
              hasMore={friendOptions.length < totalFriends!}
              loading={isFetchingNextPageFriends || isLoadingFriends}
              placeholder="Friends"
              className="!mr-3 !w-full"
            />
          </Form.Item>
        </BlockFormItem>
        <Button type="primary" className="w-full capitalize" htmlType="submit">
          create group
        </Button>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(CreateGroupModal));
