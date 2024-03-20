"use client";
import { useSocketContext } from "@/configs";
import { images } from "@/constants";
import { collapsedAtom } from "@/stores/common-store";
import {
  BellOutlined,
  LogoutOutlined,
  MessageOutlined,
  SnippetsOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { TbMessageCircleUp } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { TbShieldQuestion } from "react-icons/tb";
import { AiOutlineComment } from "react-icons/ai";

type TProps = {
  href: string;
};
const MenuSidebar = ({ href }: TProps) => {
  const socket = useSocketContext();
  const collapsed = useAtomValue(collapsedAtom);
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "diary",
      icon: <IoBookOutline />,
      label: "Diary",
    },
    {
      key: "conversations",
      icon: <MessageOutlined />,
      label: "conversations",
    },
    {
      key: "groups",
      icon: <AiOutlineComment />,
      label: "groups",
    },
    {
      key: "message-requests",
      icon: <TbMessageCircleUp />,
      label: "message requests",
    },
    {
      key: "confestions",
      icon: <TbShieldQuestion />,
      label: "confestions",
    },
    {
      key: "notifications",
      icon: <BellOutlined />,
      label: "notifications",
    },
    {
      key: "notes",
      icon: <SnippetsOutlined />,
      label: "notes",
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
  const findNewFriend = () => {
    socket.emit("onFindNewFriend", {});
    console.log("findNewFriend", socket);
  };

  const handleClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };
  return (
    <div className="flex flex-col items-center fixed">
      <Link href={`/${href}`} className="flex w-full items-center p-4">
        <Image src={images.LOGO} alt="logo" width={35} height={35} priority />
        <p className="ml-2 text-lg font-bold">Anfie</p>
      </Link>
      <Menu
        onClick={handleClick}
        theme="light"
        mode="inline"
        items={items}
        style={{ border: "none", textTransform: "capitalize" }}
      />
      <Button
        type="primary"
        htmlType="submit"
        shape="round"
        size="large"
        onClick={findNewFriend}
      >
        NEW FRIEND
      </Button>
    </div>
  );
};

export default MenuSidebar;
