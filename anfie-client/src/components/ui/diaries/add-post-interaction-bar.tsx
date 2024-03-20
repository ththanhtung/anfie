import {
  CalendarOutlined,
  CameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Upload } from "antd";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaCamera, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

const AddPostInteractionBar = () => {
  return (
    <div className="flex items-start gap-2">
      <Tooltip title="medias">
        <Upload multiple maxCount={5}>
          <Button
            shape="circle"
            icon={<FaCamera size={22} />}
            className="border-transparent shadow-none outline-none"
            htmlType="submit"
          />
        </Upload>
      </Tooltip>
      <Tooltip title="location">
        <Button
          shape="circle"
          icon={<MdLocationOn size={22} />}
          className="border-transparent shadow-none"
          htmlType="submit"
        />
      </Tooltip>
    </div>
  );
};

export default AddPostInteractionBar;
