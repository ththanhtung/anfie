import { Card } from "antd";
import React from "react";
import { images } from "@/constants";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

type TProps = {
  item: TGroup;
};
const { Meta } = Card;

const GroupItem = ({ item }: TProps) => {
  const router = useRouter();
  return (
    <Card
      className="w-[300px] cursor-pointer"
      cover={
        <Image
          alt="alley"
          src={images.TABLE}
          width={300}
          height={220}
          className="object-cover"
        />
      }
      onClick={() => {
        router.replace(`../group-conversations/${item?.id}`);
      }}
    >
      <Meta title={`Trà Chanh ${item?.title}`} />
    </Card>
  );
};

export default GroupItem;
