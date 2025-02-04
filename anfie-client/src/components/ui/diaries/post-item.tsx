import { Avatar, Button, Card, Carousel, Image, Tooltip } from "antd";
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
      {post?.medias?.length > 0 && (
        <div className="w-full">
          <Carousel arrows infinite={false} className="text-center">
            {post?.medias?.map((media) => (
              <div key={media.id}>
                <Image
                  src={media.url}
                  alt={media.key}
                  className="object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <InteractionBar />
    </Card>
  );
};

export default PostItem;
