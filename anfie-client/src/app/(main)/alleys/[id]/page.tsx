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
import { Button, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef } from "react";

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

  return (
    <>
      <div className="w-[calc(100%-250px)]">
        <h1 className="text-center text-blue-600 my-4">Alley</h1>
        <div className="flex items-end justify-between">
          <Button className="ml-4" onClick={goBack}>
            Go Back
          </Button>
          <div className="flex items-end gap-2 justify-end mr-4">
            <Button onClick={onAddAlley}>Create New Alley</Button>
            <div>
              <Typography.Title level={5}>Find Alley</Typography.Title>
              <Input placeholder="Alley ID" />
            </div>
          </div>
        </div>
        <div className="p-4 w-full grid grid-cols-4 gap-4">
          <GroupItem item={group!} />
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
