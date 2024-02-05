import { Form, Input, Tooltip, Button } from "antd";
import React, { useCallback } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { FiImage } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";

type TProps = {
  sendMessage: ({ content }: TMessageForm) => void;
};
const MessagePanelFooter = ({ sendMessage }: TProps) => {
  const onFinish = useCallback((value: TMessageForm) => {
    sendMessage({
      content: value?.content,
    });
  }, [sendMessage]);

  return (
    <Form className="flex gap-2 w-full" layout="horizontal" onFinish={onFinish}>
      <Tooltip title="More">
        <Button
          shape="circle"
          icon={<FaCirclePlus size={22} />}
          className="border-transparent shadow-none"
        />
      </Tooltip>
      <Tooltip title="Attachment">
        <Button
          shape="circle"
          icon={<FiImage size={22} />}
          className="border-transparent shadow-none"
        />
      </Tooltip>
      <Form.Item name="content" className="w-full">
        <Input
          count={{
            show: true,
            max: 2048,
          }}
        />
      </Form.Item>
      <Tooltip title="Send">
        <Button
          shape="circle"
          icon={<LuSendHorizonal size={22} />}
          className="border-transparent shadow-none"
          htmlType="submit"
        />
      </Tooltip>
    </Form>
  );
};

export default MessagePanelFooter;
