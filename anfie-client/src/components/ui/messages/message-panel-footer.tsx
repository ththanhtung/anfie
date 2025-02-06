import { Form, Input, Tooltip, Button, InputRef, Upload } from "antd";
import React, { useCallback, useRef } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { FiImage } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";

type TProps = {
  sendMessage: ({ content, medias}: TMessageForm) => void;
};
const MessagePanelFooter = ({ sendMessage }: TProps) => {
  const [form] = Form.useForm();
  const onFinish = useCallback(
    (value: TMessageForm) => {
      sendMessage(value);
      form.resetFields();
    },
    [form, sendMessage]
  );

  return (
    <Form
      form={form}
      className="flex gap-2 w-full"
      layout="horizontal"
      onFinish={onFinish}
    >
      <Tooltip title="More">
        <Button
          shape="circle"
          icon={<FaCirclePlus size={22} />}
          className="border-transparent shadow-none"
        />
      </Tooltip>
      <Tooltip title="Attachment">
        <Form.Item name="medias">
          <Upload
            multiple
            maxCount={5}
            showUploadList={true}
            onChange={() => {}}
          >
            <Button
              shape="circle"
              icon={<FiImage size={22} />}
              className="border-transparent shadow-none"
            />
          </Upload>
        </Form.Item>
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
          icon={<LuSendHorizontal size={22} />}
          className="border-transparent shadow-none"
          htmlType="submit"
        />
      </Tooltip>
    </Form>
  );
};

export default MessagePanelFooter;
