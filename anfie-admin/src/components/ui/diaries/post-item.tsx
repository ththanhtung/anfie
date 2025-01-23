import { Avatar, Button, Card, Tooltip } from "antd";
import React from "react";
import InteractionBar from "./interaction-bar";
import { images } from "@/constants";
import { UserOutlined } from "@ant-design/icons";
import { TfiMoreAlt } from "react-icons/tfi";
import { _formatDay } from "@/utils";
type TProps = {
  post: TPost;
};
const PostItem = ({ post }: TProps) => {
  return (
    <Card className="mx-auto mb-4">
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="justify-between"
      >
        <div className="user-info flex items-center">
          <Avatar icon={<UserOutlined />} size="large" />
          <div style={{ marginLeft: 10 }}>
            <h3>{post.author.lastName + " " + post.author.firstName}</h3>
            <p>{_formatDay.formatDDMMYYYYHH(post.created_at)}</p>
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
      <p className="my-4">{post.content}</p>
      <img
        src={images.LOGO}
        alt="post image"
        style={{ width: "100%", height: "100%" }}
      />
      <InteractionBar />
    </Card>
  );
};

export default PostItem;
