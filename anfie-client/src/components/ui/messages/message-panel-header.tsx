import {
  MenuOutlined,
  PhoneOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";

type TProps = {
  recipientName: string;
};
const MessagePanelHeader = ({ recipientName }: TProps) => {
  return (
    <div className="flex justify-between p-6 bg-sky-200">
      <div className="flex justify-center items-center gap-4">
        <Avatar icon={<UserOutlined />} size="large" />
        <p className="font-semibold text-blue-500 text-xl">{recipientName}</p>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button
          type="primary"
          shape="circle"
          style={{ backgroundColor: "#52DD68" }}
          icon={<PhoneOutlined />}
          size="large"
        />
        <Button
          type="primary"
          shape="circle"
          style={{ backgroundColor: "#52DD68" }}
          icon={<VideoCameraOutlined />}
          size="large"
        />
        <Button
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
          icon={<MenuOutlined />}
          size="large"
        />
      </div>
    </div>
  );
};

export default MessagePanelHeader;
