import { useMemo } from "react";
import Link from "next/link";
import { ColumnsType } from "antd/es/table";
import { AFPagination, AFTable } from "@/components";
import { routes } from "@/constants";
import { _common, _formatDay } from "@/utils";

type TProps = {
  totalItems: number | undefined;
  page: number | undefined;
  limit: number | undefined;
  handlePagination: (page: number, limit: number) => void;
  tickets: TGetReportTicketsAdminResponse[];
  isLoading: boolean;
};
const TableTickets = ({
  totalItems,
  page,
  limit,
  handlePagination,
  tickets,
  isLoading,
}: TProps) => {
  const columns: ColumnsType<TGetReportTicketsAdminResponse> = useMemo(() => {
    return [
      {
        title: "Ticket ID",
        dataIndex: "id",
        key: "id",
        render: (_, record) => (
          <>
            <p>{record.id.substring(0, 8)}</p>
          </>
        ),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (_, record) => (
          <>
            <p>{record.type}</p>
          </>
        ),
      },
      {
        title: "Reportee",
        dataIndex: "reportee",
        key: "reportee",
        render: (_, record) => (
          <>
            <p>{record?.reportee?.user?.email}</p>
          </>
        ),
      },
      {
        title: "Reporter",
        dataIndex: "reporter",
        key: "reporter",
        render: (_, record) => (
          <>
            <p>{record?.reporter?.user?.email}</p>
          </>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, record) => <span>{record.status}</span>,
      },
      {
        title: "View",
        dataIndex: "source",
        key: "source",
        render: (_, record) => (
          <Link href={`${routes.REPORT_TICKETS}/${record.id}`}>View</Link>
        ),
      },
    ];
  }, []);

  return (
    <>
      <AFTable
        columns={columns}
        dataSource={tickets}
        rowKey={(item) => item.id}
        loading={isLoading}
      />
      <div style={{ height: 12 }} />
      <AFPagination
        total={totalItems}
        current={page}
        pageSize={limit}
        handlePagination={handlePagination}
      />
      <div style={{ height: 24 }} />
    </>
  );
};
export default TableTickets;
