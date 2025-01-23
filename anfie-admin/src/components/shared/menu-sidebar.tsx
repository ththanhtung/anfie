"use client";
import { useSocketContext } from "@/configs";
import { images, LocalKey, queryKeys } from "@/constants";
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
import { deleteCookieValue, getCookieValue } from "@/utils";
import { deleteCookie, getCookie } from "cookies-next";

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
  console.log({ userProfile });

  useEffect(() => {
    setIsFindingNewFriend(userProfile?.user?.isFindFriend);
  }, [userProfile]);

  const [isFindingNewFriend, setIsFindingNewFriend] = React.useState(
    userProfile?.user?.isFindFriend
  );

  const [current, setCurrent] = useState<string>(href);

  const remainingConversations = userProfile?.strangerConversationSlots ?? 0;

  const items: MenuProps["items"] = [
    // {
    //   key: "page",
    //   icon: <IoBookOutline />,
    //   label: "Group Page",
    // },
    {
      key: "conversations",
      icon: <MessageOutlined />,
      label: "conversations",
    },
    {
      key: "group-conversations",
      icon: <AiOutlineComment />,
      label: "group conversations",
    },
    {
      key: "alleys",
      icon: <LuDoorOpen />,
      label: "Alley",
    },
    {
      key: "message-requests",
      icon: <TbMessageCircleUp />,
      label: "message requests",
    },
    {
      key: "friend-requests",
      icon: <IoPersonAddOutline />,
      label: "friend requests",
    },
    {
      key: "confessions",
      icon: <TbShieldQuestion />,
      label: "confessions",
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

  socket.on?.("onConversationCreated", (payload: any) => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.GET_USER_PROFILE],
    });
    setIsFindingNewFriend(false);
  });

  socket.on?.("onConversationRequestRejected", (payload: any) => {
    setIsFindingNewFriend(false);
  });

  const findNewFriend = () => {
    onFindNewFriend({
      cb: () => {
        setIsFindingNewFriend((prev) => !prev);
      },
    });
    console.log("findNewFriend", socket);
  };

  const handleClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem(LocalKey.ACCESS_TOKEN_LOCALKEY);
      localStorage.removeItem(LocalKey.USER_INFO);
      // deleteCookieValue({ name: LocalKey.JWT_AUTHORIZATION });
      deleteCookie(LocalKey.JWT_AUTHORIZATION, {
        path: "/",
        domain: "127.0.0.1",
      });
      const cookie = getCookie( LocalKey.JWT_AUTHORIZATION);
      console.log({ cookie });
      
      // router.push("/login");
      return;
    }
    setCurrent(e.key);
    router.replace(`${process.env.NEXT_PUBLIC_URL}/${e.key}`);
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
        selectedKeys={[current]}
        style={{ border: "none", textTransform: "capitalize" }}
      />
      <Button
        type="primary"
        htmlType="submit"
        shape="round"
        size="large"
        disabled={remainingConversations < 1}
        onClick={findNewFriend}
      >
        {isFindingNewFriend ? "Cancel" : "Find New Friend"}
      </Button>
    </div>
  );
};

export default MenuSidebar;
