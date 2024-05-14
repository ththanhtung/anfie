import React, { memo } from "react";
import { Select, SelectProps } from "antd";

interface IProps extends SelectProps {
  options: TOption[];
}
function AFSelect({ ...props }: IProps) {
  return (
    <Select
      dropdownStyle={{
        padding: 0,
      }}
      filterOption={(input, option: any) =>
        option?.label.toString()?.toLowerCase().indexOf(input.toLowerCase()) >=
        0
      }
      {...props}
    />
  );
}
export default memo(AFSelect);
