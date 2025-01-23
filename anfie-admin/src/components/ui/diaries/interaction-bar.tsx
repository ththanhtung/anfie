import { Button, Tooltip } from "antd";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const InteractionBar = () => {
  return (
    <div className="flex items-center gap-4">
      <Tooltip title="like">
        <Button
          shape="circle"
          icon={<AiOutlineLike size={22} />}
          className="border-transparent shadow-none outline-none"
          htmlType="submit"
        />
      </Tooltip>
      <Tooltip title="comment">
        <Button
          shape="circle"
          icon={<FaRegComment size={22} />}
          className="border-transparent shadow-none"
          htmlType="submit"
        />
      </Tooltip>
      <Tooltip title="share">
        <Button
          shape="circle"
          icon={<FiSend size={22} />}
          className="border-transparent shadow-none"
          htmlType="submit"
        />
      </Tooltip>
    </div>
  );
};

export default InteractionBar;
