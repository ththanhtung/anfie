import { Avatar, Button, Card, Tooltip } from "antd";
import React from "react";
import InteractionBar from "./interaction-bar";
import { images } from "@/constants";
import { UserOutlined } from "@ant-design/icons";
import { TfiMoreAlt } from "react-icons/tfi";

const PostItem = () => {
  return (
    <Card className="mx-auto mb-4">
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="justify-between"
      >
        <div className="user-info flex items-center">
          <Avatar icon={<UserOutlined />} size="large" />
          <div style={{ marginLeft: 10 }}>
            <h3>John Doe</h3>
            <p>20 minutes ago</p>
          </div>
        </div>
        <Tooltip title="more">
          <Button
            shape="circle"
            icon={<TfiMoreAlt size={22} />}
            className="border-transparent shadow-none"
            htmlType="submit"
          />
        </Tooltip>
      </div>
      <p className="my-4">Lorem ipsum dolor sit amet</p>
      <img
        src={images.LOGO}
        alt="jj"
        style={{ width: "100%", height: "100%" }}
      />
      <InteractionBar />
    </Card>
  );
};

export default PostItem;
