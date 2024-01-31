import { images } from "@/constants";
import {
  BellOutlined,
  HomeOutlined,
  MessageOutlined,
  SnippetsOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TProps = {
  href: string;
};
const MenuSidebar = ({ href }: TProps) => {
  const items: MenuProps["items"] = [
    {
      key: "0",
      icon: <HomeOutlined />,
      label: 'home'
    },
    {
      key: "1",
      icon: <MessageOutlined />,
      label: "conversations",
    },
    {
      key: "2",
      icon: <UsergroupAddOutlined />,
      label: "groups",
    },
    {
      key: "3",
      icon: <BellOutlined />,
      label: "notifications",
    },
    {
      key: "4",
      icon: <SnippetsOutlined />,
      label: "notes",
    },
    {
      key: "5",
      icon: <UserOutlined />,
      label: "profile",
    },
  ];
  return (
    <>
      <Link href={`/${href}`}>
        <Image src={images.LOGO} alt="logo" width={35} height={35} priority />
        <p>anfie</p>
      </Link>
      <Menu theme="light" mode="inline" items={items} />
      <Button type="primary" htmlType="submit" shape="round">
        NEW FRIEND
      </Button>
    </>
  );
};

export default MenuSidebar;
