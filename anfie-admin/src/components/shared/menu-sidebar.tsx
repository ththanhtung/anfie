"use client";
import { useSocketContext } from "@/configs";
import { images, queryKeys } from "@/constants";
import { collapsedAtom } from "@/stores/common-store";
import {
  BellOutlined,
  LogoutOutlined,
  MessageOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbMessageCircleUp } from "react-icons/tb";
import { IoBookOutline, IoPersonAddOutline } from "react-icons/io5";
import { TbShieldQuestion } from "react-icons/tb";
import { AiOutlineComment } from "react-icons/ai";
import { MdOutlineStorefront } from "react-icons/md";
import { LuDoorOpen } from "react-icons/lu";
import { useMutationUserProfile, useUserProfile } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

type TProps = {
  href: string;
};
const MenuSidebar = ({ href }: TProps) => {
  const socket = useSocketContext();
  const collapsed = useAtomValue(collapsedAtom);
  const router = useRouter();
  const { onFindNewFriend } = useMutationUserProfile();
  const { userProfile } = useUserProfile();
  const queryClient = useQueryClient();

  const [current, setCurrent] = useState<string>(href);

  const items: MenuProps["items"] = [
    // {
    //   key: "page",
    //   icon: <IoBookOutline />,
    //   label: "Group Page",
    // },
    {
      key: "users",
      icon: <MessageOutlined />,
      label: "users",
    },
    {
      key: "report-tickets",
      icon: <AiOutlineComment />,
      label: "report tickets",
    },
    {
      key: "alleys",
      icon: <LuDoorOpen />,
      label: "Alleys",
    },
    {
      key: "posts",
      icon: <TbMessageCircleUp />,
      label: "Posts",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "profile",
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: "red" }} />,
      label: "logout",
    },
  ];

  const handleClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
    setCurrent(e.key);
    router.replace(`${process.env.NEXT_PUBLIC_URL}/${e.key}`);
  };
  return (
    <div className="flex flex-col items-center fixed">
      <Link href={`/${href}`} className="flex w-full items-center p-4">
        <Image src={images.LOGO} alt="logo" width={35} height={35} priority />
        <p className="ml-2 text-lg font-bold">Admin</p>
      </Link>
      <Menu
        onClick={handleClick}
        theme="light"
        mode="inline"
        items={items}
        selectedKeys={[current]}
        style={{ border: "none", textTransform: "capitalize" }}
      />
    </div>
  );
};

export default MenuSidebar;
