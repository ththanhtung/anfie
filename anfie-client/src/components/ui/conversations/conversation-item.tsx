import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";
type TProps = {
  avatar?: string;
  username: string;
  lastMessage: TMessage;
  id: number;
  value?: number;
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
      }`}
      onClick={onClick}
    >
      <Avatar icon={<UserOutlined />} size="large" />
      <div className="item-body">
        <h3 className="font-semibold">{username}</h3>
        <p className="text-slate-500">{lastMessage?.content}</p>
      </div>
      <Button
        type="primary"
        shape="round"
        // style={{ backgroundColor: "#87d068" }}
        icon={<UserAddOutlined />}
        size="large"
      />
    </div>
  );
};

export default ConversationItem;
