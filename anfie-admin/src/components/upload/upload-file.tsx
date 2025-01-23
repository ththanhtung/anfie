import { useMemo } from "react";
import { message, Upload, UploadProps } from "antd";
import type {
  UploadFile as UploadFileProps,
  UploadListType,
} from "antd/es/upload/interface";

const UploadButton = (
  <div className="flex justify-center h-full items-center">
    <span className="icon-upload text-neutral_700 mr-2" />
    <div className="flex">
      <p className="text-neutral_700 mr-1">Upload file</p>
      <p className="text-neutral_700">(Only support pdf format)</p>
    </div>
  </div>
);
const UploadFile = ({
  listType = "text",
  value,
  onChange,
  uploadButtonEl = UploadButton,
  type,
  ...props
}: TUploadFileProps & UploadProps) => {
  const uploadProps = useMemo(
    () =>
      ({
        ...props,
        listType,
        fileList: value,
        accept: "application/*",
        multiple: true,
        progress: {
          strokeColor: {
            "0%": "#108ee9",
            "100%": "#87d068",
          },
          strokeWidth: 3,
          format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
        maxCount: 5,
        iconRender: (file: UploadFileProps, listType?: UploadListType) => {
          if (listType === "picture-card") {
            return (
              <span className="icon-document-filled text-4xl text-neutral_700 mt-6 block" />
            );
          } else
            return (
              <span className="icon-document-filled text-lg text-neutral_700 block pt-0.5" />
            );
        },
        beforeUpload: (file) => {
          const isPdf = file.type === "application/pdf";
          if (!isPdf) {
            message.error("Bạn chỉ có thể upload file PDF!");
            return isPdf || Upload.LIST_IGNORE;
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
    [props, listType, value, onChange]
  );

  return (
    <Upload {...uploadProps} className="upload-file">
      {uploadButtonEl}
    </Upload>
    // <h1>dfd</h1>
  );
};
export default UploadFile;
