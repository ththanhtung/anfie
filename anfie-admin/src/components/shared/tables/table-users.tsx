import { useMemo } from "react";
import Link from "next/link";
import { ColumnsType } from "antd/es/table";
import { AFPagination, AFTable } from "@/components";
import { images, routes } from "@/constants";
import { _common, _formatDay } from "@/utils";
import { Image } from "antd";

type TProps = {
  totalItems: number | undefined;
  page: number | undefined;
  limit: number | undefined;
  handlePagination: (page: number, limit: number) => void;
  users: TGetUsersAdminResponse[];
  isLoading: boolean;
};
const TableUsers = ({
  totalItems,
  page,
  limit,
  handlePagination,
  users,
  isLoading,
}: TProps) => {
  const columns: ColumnsType<TGetUsersAdminResponse> = useMemo(() => {
    return [
      {
        title: "Image",
        dataIndex: "imageUrls",
        key: "imageUrls",
        render: (_, record) => (
          <Image
            alt={record.id}
            className="object-cover"
            src={
              record?.profilePictureUrl
                ? images.DEFAULT_AVATAR
                : record?.profilePictureUrl
            }
            width={60}
            height={38}
          />
        ),
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
        render: (_, record) => (
          <>
            <p>{record.firstName}</p>
          </>
        ),
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        render: (_, record) => (
          <>
            <p>{record.lastName}</p>
          </>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (_, record) => (
          <>
            <p>{record.email}</p>
          </>
        ),
      },
      {
        title: "gender",
        dataIndex: "gender",
        key: "gender",
        render: (_, record) => (
          <>
            <p>{record.profile.gender}</p>
          </>
        ),
      },
      {
        title: "Status",
        dataIndex: "isBanned",
        key: "isBanned",
        render: (_, record) => (
          <span>{record.profile.isBanned ? "Banned" : "Active"}</span>
        ),
      },
      {
        title: "Current Location",
        dataIndex: "userLocation",
        key: "location",
        render: (_, record) => <p>{record?.profile.userLocation}</p>,
      },
      {
        title: "View",
        dataIndex: "source",
        key: "source",
        render: (_, record) => (
          <Link href={`${routes.USERS}/${record.id}`}>View</Link>
        ),
      },
    ];
  }, []);

  return (
    <>
      <AFTable
        columns={columns}
        dataSource={users}
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
export default TableUsers;
