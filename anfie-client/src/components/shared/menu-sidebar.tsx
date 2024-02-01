import { images } from "@/constants";
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
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
      label: "home",
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
    {
      key: "6",
      icon: <LogoutOutlined style={{color: 'red'}}/>,
      label: 'logout',
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <Link href={`/${href}`} className="flex w-full items-center p-4">
        <Image src={images.LOGO} alt="logo" width={35} height={35} priority />
        <p className="ml-2 text-lg font-bold">Anfie</p>
      </Link>
      <Menu theme="light" mode="inline" items={items} style={{border: 'none'}}/>
      <Button type="primary" htmlType="submit" shape="round" size="large">
        NEW FRIEND
      </Button>
    </div>
  );
};

export default MenuSidebar;
