"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { EReportTicketStatus } from "@/constants";
import { useDebounce } from "@/hooks";

type IProps = {
  setParams: Dispatch<SetStateAction<TGetReportTicketsParams>>;
};
const FilterTicket = ({ setParams }: IProps) => {
  const [reporter, setReporter] = useState("");
  const [reportee, setReportee] = useState("");
  const [ticketId, setTicketId] = useState("");
  const debounceReporter = useDebounce(reporter, 600);
  const debounceReportee = useDebounce(reportee, 600);
  const debounceTicketId = useDebounce(ticketId, 600);

  const statusOptions = [
    {
      label: "Pending",
      value: EReportTicketStatus.PENDING,
    },
    {
      label: "Accepted",
      value: EReportTicketStatus.ACCEPTED,
    },
    {
      label: "Rejected",
      value: EReportTicketStatus.REJECTED,
    },
  ];

  useEffect(() => {
    if (!debounceReporter) {
      setParams((prev) => {
        delete prev.reporterEmail;
        return {
          ...prev,
        };
      });
      return;
    }

    setParams((prev) => ({
      ...prev,
      reporterEmail: debounceReporter as string,
    }));
  }, [debounceReporter, setParams]);

  useEffect(() => {
    if (!debounceReportee) {
      setParams((prev) => {
        delete prev.reporteeEmail;
        return {
          ...prev,
        };
      });
      return;
    }

    setParams((prev) => ({
      ...prev,
      reporteeEmail: debounceReportee as string,
    }));
  }, [debounceReportee, setParams]);

  useEffect(() => {
    if (!debounceTicketId) {
      setParams((prev) => {
        delete prev.ticketId;
        return {
          ...prev,
        };
      });
      return;
    }

    setParams((prev) => ({
      ...prev,
      ticketId: debounceTicketId as string,
    }));
  }, [debounceTicketId, setParams]);

  const [form] = Form.useForm();

  return (
    <Form form={form} className="flex !px-4">
      <Form.Item className="!mb-0" name="ticketId">
        <Input
          placeholder="Ticket ID"
          prefix={<span className="icon-search text-neutral_600" />}
          className="!w-[200px] !mr-3"
          onChange={(e) => setTicketId(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="!mb-0" name="reportee">
        <Input
          placeholder="Reportee"
          prefix={<span className="icon-search text-neutral_600" />}
          className="!w-[200px] !mr-3"
          onChange={(e) => setReportee(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="!mb-0" name="reporter">
        <Input
          placeholder="Reportee"
          prefix={<span className="icon-search text-neutral_600" />}
          className="!w-[200px] !mr-3"
          onChange={(e) => setReporter(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="!mb-0" name="status">
        <Select
          mode="tags"
          options={statusOptions}
          placeholder="Status"
          className="!mr-3 !w-[120px]"
          onChange={(value) => {
            const status = value
              .map((status: string) => {
                return statusOptions.find((item) => item.value === status);
              })
              .map((item: TOption) => item?.value);

            setParams((prev) => ({
              ...prev,
              status: JSON.stringify(status),
            }));
          }}
        />
      </Form.Item>
      <Form.Item shouldUpdate className="!mb-0">
        {({ getFieldsValue }) => {
          const fieldsValue = getFieldsValue([
            "ticketId",
            "reportee",
            "reporter",
            "status",
          ]);
          if (Object.values(fieldsValue).filter(Boolean).length === 0) return;
          return (
            <Button
              type="default"
              onClick={() => {
                setParams((prev) => ({ page: prev.page, limit: prev.limit }));
                form.resetFields();
                setReportee("");
                setReporter("");
              }}
            >
              Reset
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
};
export default FilterTicket;
