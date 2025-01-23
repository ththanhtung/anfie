import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";
type TProps = {
  avatar?: string;
  username: string;
  lastMessage: TMessage | TGroupMessage;
  id: string;
  value?: string;
  onClick: () => void;
};
const ConversationItem = ({
  avatar,
  username,
  lastMessage,
  id,
  value,
  onClick,
}: TProps) => {
  return (
    <div
      className={`conversation-item hover: shadow-md hover:scale-[1.02] ${
        id === value && "conversation-item-active"
      } w-full`}
      onClick={onClick}
    >
      <Avatar icon={<UserOutlined />} size="large" />
      <div className="item-body ml-4">
        <h3 className="font-semibold capitalize">{username}</h3>
        <p className="text-slate-500">{lastMessage?.content}</p>
      </div>
    </div>
  );
};

export default ConversationItem;
