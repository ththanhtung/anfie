import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";
type TProps = {
  avatar?: string;
  username: string;
  lastMessage: TMessage;
};
const ConversationItem = ({ avatar, username, lastMessage }: TProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 w-[80%] bg-white p-2 rounded-md mb-2 mx-auto cursor-pointer hover:shadow-md hover:scale-[1.02] ease-in duration-150">
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
