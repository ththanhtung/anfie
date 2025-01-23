"use client";
import { AFSelectInfinite } from "@/components";
import { useListInfinityTags } from "@/hooks";
import { Form } from "antd";
import React, { Dispatch, SetStateAction } from "react";

type TProps = {
  setParams: Dispatch<SetStateAction<TConfessionParams>>;
};
const FilterConfession = ({ setParams }: TProps) => {
  const [form] = Form.useForm();

  const {
    tagOptions,
    fetchNextPage,
    isFetchingNextPage,
    total = 0,
  } = useListInfinityTags({});

  return (
    <Form form={form} className="flex !py-4 !px-6">
      <Form.Item className="!mb-0" name={"tags"}>
        <AFSelectInfinite
          options={tagOptions}
          loadMore={fetchNextPage}
          hasMore={tagOptions.length < total}
          loading={isFetchingNextPage}
          placeholder="Choose the type of confession you want to read"
          className="!w-[800px]"
          onChange={(value: number[]) => {
            const tagIds = value.map((item) => item.toString());
            setParams((prev) => ({
              ...prev,
              tagIds: JSON.stringify(tagIds),
            }));
          }}
        />
      </Form.Item>
    </Form>
  );
};
export default React.memo(FilterConfession);
