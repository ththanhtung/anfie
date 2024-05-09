'use client'
import React, { memo, useRef } from "react";
import { Select, SelectProps, Spin } from "antd";

interface IProps extends SelectProps {
  options: TOption[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}
function AFSelectInfinite({
  options,
  loadMore,
  hasMore,
  loading,
  ...props
}: IProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const lastElement = document.getElementById(
      ((options || []).length - 1).toString()
    )!;
    const containerTop = dropdownRef.current?.getBoundingClientRect().top;
    const lastElementTopPos =
      lastElement?.getBoundingClientRect().top - containerTop!;
    const containerHeight = dropdownRef.current?.getBoundingClientRect().height;

    if (
      lastElementTopPos - 15 < containerHeight! &&
      loading === false &&
      hasMore
    ) {
      loadMore();
    }
  };

  return (
    <Select
      mode="tags"
      dropdownStyle={{
        padding: 0,
      }}
      filterOption={(input, option: any) =>
        option?.label?.toString()?.toLowerCase().indexOf(input.toLowerCase()) >=
        0
      }
      dropdownRender={(menu) => (
        <div ref={dropdownRef} onWheel={(e) => handleScroll(e)}>
          {menu}
          <div className="text-center py-2">
            <Spin size="small" spinning={loading} />
          </div>
        </div>
      )}
      {...props}
    >
      {options?.map(({ label, value, ...props }, index) => (
        <Select.Option id={index} key={value} value={value} {...props}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
}
export default memo(AFSelectInfinite);
