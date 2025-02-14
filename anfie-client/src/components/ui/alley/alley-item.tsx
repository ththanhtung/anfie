import { Card, Button, message } from "antd";
import React from "react";
import { images } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

type TProps = {
  alley: TAlley;
};

const { Meta } = Card;

const AlleyItem = ({ alley }: TProps) => {
  const router = useRouter();

  return (
    <Card
      className="w-[300px] cursor-pointer"
      cover={
        <Image
          alt="alley"
          src={images.ALLEY}
          width={300}
          height={220}
          className="object-cover"
          onClick={() => router.replace(`${alley.id}`)}
        />
      }
    >
      <Meta title={`${alley.title} Alley`} />
    </Card>
  );
};

export default AlleyItem;
