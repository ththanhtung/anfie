"use client";
import { AFSelectInfinite, BlockFormItem } from "@/components";
import { useListInfiniteFriends } from "@/hooks";
import { userInfoStoreAtom } from "@/stores";
import { Button, Form, Modal } from "antd";
import { useAtomValue } from "jotai";
import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
type TProps = {
  onAdd?: (params: TAddRecipientsToGroupParams) => void;
  groupId: string;
};
const AddRecipientsModal = (
  { onAdd, groupId }: TProps,
  ref: Ref<TModalRef>
) => {
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
    onAdd?.({
      groupId,
      form: {
        recipientIds: value.friends ?? [],
      },
    });
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
        <BlockFormItem label="New Group Members">
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
          Add
        </Button>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(AddRecipientsModal));
