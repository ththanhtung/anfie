"use client";
import { Button, Form, Input, Modal } from "antd";
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
import { useMutationConfession } from "@/hooks/confessions";

const CreateConfessionModal = (props: any, ref: Ref<TModalRef>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onCreateConfession, isCreateConfessionPending } =
    useMutationConfession();
  const { onCreateOrUpdateTag, isLoading: isTagLoading } = useMutationTag();
  const {
    tagOptions,
    fetchNextPage: fetchNextPageTags,
    isFetchingNextPage,
    total: totalTags = 0,
  } = useListInfinityTags({});

  const handleSelectTag = useCallback(
    (
      value: any,
      options: DefaultOptionType | DefaultOptionType[] | undefined
    ) => {
      const existedTagOptionValues: string[] = tagOptions.map(
        (option) => option.value
      );

      if (options?.length <= 1) {
        const newTag: string[] = value.filter(
          (element: string) => !existedTagOptionValues.includes(element)
        );

        if (newTag.length > 0) {
          onCreateOrUpdateTag({
            form: {
              name: newTag[0],
            },
          });
        }
      }
    },
    [tagOptions, onCreateOrUpdateTag]
  );

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
    const tags = tagOptions
      .filter((tag) => value.tags.includes(tag.value))
      .map((tag) => tag.label);
    onCreateConfession({ form: { ...value, tags }, cb: closeModal });
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
            placeholder="My confession story is..."
            className="mb-2"
          />
        </Form.Item>
        <Form.Item name="tags">
          <AfSelectInfinite
            allowClear
            options={tagOptions}
            loadMore={fetchNextPageTags}
            hasMore={tagOptions.length < totalTags}
            loading={isFetchingNextPage || isTagLoading}
            placeholder="Tags"
            className="!mr-3 !w-full"
            onChange={handleSelectTag}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isCreateConfessionPending}
        >
          post
        </Button>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(CreateConfessionModal));
