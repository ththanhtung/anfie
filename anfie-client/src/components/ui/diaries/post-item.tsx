import {
  Avatar,
  Button,
  Card,
  Carousel,
  Dropdown,
  Image,
  MenuProps,
  Tooltip,
} from "antd";
import React, { useCallback, useMemo, useRef } from "react";
import InteractionBar from "./interaction-bar";
import { EPostDropdownAction, images } from "@/constants";
import { UserOutlined } from "@ant-design/icons";
import { TfiMoreAlt } from "react-icons/tfi";
import { _formatDay } from "@/utils";
import { useAtomValue } from "jotai";
import { userInfoStoreAtom } from "@/stores";
import PostCommentsModel from "./post-comments-model";
type TProps = {
  post: TPost;
  onReport: () => void;
  onClick?: () => void;
  onShowComments?: () => void;
};
const PostItem = ({ post, onReport, onClick, onShowComments }: TProps) => {
  const currentUser = useAtomValue(userInfoStoreAtom);
  const dropdownItems: MenuProps["items"] = useMemo(() => {
    return [
      ...(currentUser?.userId === post.author.id
        ? []
        : [
            {
              key: EPostDropdownAction.REPORT,
              label: (
                <span className="text-neutral_800 text-sm ml-2 capitalize text-red-700">
                  Report Post
                </span>
              ),
              icon: <span className="!text-base text-neutral_700 icon-undo" />,
            },
          ]),
    ];
  }, [currentUser?.userId, post.author.id]);

  return (
    <Card className="mx-auto mb-4" onClick={onClick}>
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
          <Dropdown
            menu={{
              items: dropdownItems,
              onClick: (e) => {
                switch (e.key) {
                  case EPostDropdownAction.REPORT:
                    onReport();
                    break;
                  default:
                    break;
                }
              },
            }}
            className="cirle-header group"
            overlayStyle={{
              width: 200,
            }}
          >
            <Button
              shape="circle"
              icon={<TfiMoreAlt size={22} />}
              className="border-transparent shadow-none"
              htmlType="submit"
            />
          </Dropdown>
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
      <InteractionBar onShowComments={onShowComments} />
    </Card>
  );
};

export default PostItem;
