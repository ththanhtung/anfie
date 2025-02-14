"use client";

import AlleyItem from "@/components/ui/alley/alley-item";
import CreateAlleyModal from "@/components/ui/alley/create-alley-modal";
import GroupItem from "@/components/ui/alley/group-item";
import {
  useGetAlleyByParentId,
  useGetDetailsAlley,
  useGetGroupByAlleyId,
} from "@/hooks";
import { _common } from "@/utils";
import { Button, Input, message, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef } from "react";
const { Search } = Input;

const AlleyDetailPage = ({ params }: TDetailPage) => {
  const { alleyChildren } = useGetAlleyByParentId(params.id);
  const { group } = useGetGroupByAlleyId(params.id);
  const { alley } = useGetDetailsAlley(params.id);
  const ref = useRef<TModalRef>(null);
  const router = useRouter();

  const onAddAlley = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const goBack = useCallback(() => {
    if (!alley?.parentId) {
      return;
    }
    router.push(`/alleys/${alley?.parentId}`);
  }, [alley?.parentId, router]);

  const copyAlleyId = async () => {
    try {
      await navigator.clipboard.writeText(params.id);
      message.success("Alley ID copied to clipboard!");
    } catch (error) {
      message.error("Failed to copy Alley ID.");
    }
  };

  return (
    <>
      <div className="w-[calc(100%-250px)]">
        <h1 className="text-center text-blue-600 my-4">Alley</h1>
        <div className="flex items-end justify-between">
          <div className="flex gap-2 items-center">
            <Button className="ml-4" onClick={goBack}>
              Go Back
            </Button>
            <Button onClick={copyAlleyId} type="primary" className="">
              Copy Alley ID
            </Button>
          </div>
          <div className="flex items-end gap-2 justify-end mr-4">
            <Button onClick={onAddAlley}>Create New Alley</Button>
            <div>
              <Typography.Title level={5}>Find Alley</Typography.Title>
              <Search
                placeholder="input alley id"
                onSearch={(value) => {
                  router.replace(`${value}`);
                }}
                enterButton
              />
            </div>
          </div>
        </div>
        <div className="p-4 w-full grid grid-cols-4 gap-4">
          {group && <GroupItem item={group!} />}
          {alleyChildren?.map((item) => (
            <AlleyItem key={item.id} alley={item} />
          ))}
        </div>
      </div>

      <CreateAlleyModal ref={ref} parentId={params.id} />
    </>
  );
};

export default AlleyDetailPage;
