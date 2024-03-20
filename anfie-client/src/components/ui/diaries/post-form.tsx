import { Avatar, Form, Input } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

type TProps = {
  onAddPost: () => void;
};
const PostForm = ({ onAddPost }: TProps) => {
  return (
    <div
      className="flex items-center bg-white px-8 py-4 w-full mb-4 rounded-md justify-between"
      onClick={onAddPost}
    >
      <Avatar icon={<UserOutlined />} size="large" />
      <Form layout="horizontal" className="w-[88%]">
        <Form.Item name="content" className="h-[10px]">
          <Input className="bg-slate-100 h-full" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
