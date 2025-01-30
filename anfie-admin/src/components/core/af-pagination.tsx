import { AFParagraph } from "@/components";
import { EArrow } from "@/constants";
import { useQueryParams } from "@/hooks";
import { Pagination, PaginationProps } from "antd";
import { useMemo } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

type TProps = PaginationProps & {
  handlePagination: (page: number, limit: number) => void;
};
const AFPagination = ({
  total = 0,
  pageSize = 0,
  current = 1,
  handlePagination,
}: TProps) => {
  const { createQueryString } = useQueryParams();
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === EArrow.PREV) {
      return <GrPrevious />
    }
    if (type === EArrow.NEXT) {
      return <GrNext />;
    }
    return originalElement;
  };
  const { startIdx, endIdx } = useMemo(() => {
    const startIdx = Math.max((current - 1) * pageSize + 1, 1);
    const endIdx = Math.min(current * pageSize, total);
    return {
      startIdx,
      endIdx,
    };
  }, [current, pageSize, total]);
  if (total < 10) return <></>;
  return (
    <div className="flex-between px-6">
      <p>
        {`${startIdx || 0} - ${endIdx || 0} of ${total || 0} items`}
      </p>
      <Pagination
        size="small"
        total={total}
        hideOnSinglePage
        pageSize={pageSize}
        current={current}
        onChange={(current, size) => {
          handlePagination(current, size);
          createQueryString({
            page: current,
            limit: size,
          });
        }}
        itemRender={itemRender}
        onShowSizeChange={(current, size) => {
          handlePagination(current, size);
          createQueryString({
            page: current,
            limit: size,
          });
        }}
      />
    </div>
  );
};
export default AFPagination;
