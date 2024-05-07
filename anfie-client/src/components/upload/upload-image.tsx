import { ReactNode, useMemo } from "react";
import { Upload, UploadProps, message } from "antd";

type TProps = {
  uploadButtonEl?: ReactNode;
  value?: any;
  onChange?: any;
} & UploadProps;

const UploadButton = (
  <div className="flex flex-col items-center">
    <span className="icon-upload text-xl text-neutral_700 mb-1" />
    <p>Upload</p>
  </div>
);

const UploadImage = ({
  uploadButtonEl = UploadButton,
  value,
  onChange,
  ...props
}: TProps) => {
  const uploadProps = useMemo(
    () =>
      ({
        ...props,
        listType: "picture-card",
        fileList: value,
        accept: "image/*",
        progress: "true",
        beforeUpload: (file) => {
          const isJpgOrPng =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/webp";
          if (!isJpgOrPng) {
            message.error("Bạn chỉ có thể upload ảnh JPG/PNG/WEBP!");
            return isJpgOrPng || Upload.LIST_IGNORE;
          }
          return false;
        },
        onChange: ({ fileList }) => {
          onChange(fileList);
        },
        customRequest: ({ onSuccess }) => {
          setTimeout(() => {
            onSuccess?.("ok");
          }, 0);
        },
      } as UploadProps),
    [onChange, props, value]
  );
  return (
    <Upload {...uploadProps} className="avatar-uploader">
      {uploadButtonEl}
    </Upload>
  );
};
export default UploadImage;
