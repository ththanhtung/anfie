import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react'

type TProps = {
    message: TMessage
}
const MessageItem = ({message}:TProps) => {
  return (
    <div>
      <Avatar icon={<UserOutlined />} size="small" />
    </div>
  );
}

export default MessageItem