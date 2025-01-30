import { Empty, Table, TableProps } from "antd";

const AFTable = ({
  dataSource,
  columns,
  loading,
  ...props
}: TableProps<any>) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      locale={{
        emptyText: <Empty />,
      }}
      {...props}
    />
  );
};
export default AFTable;
