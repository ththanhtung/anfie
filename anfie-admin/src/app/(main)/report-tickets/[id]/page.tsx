"use client";
import {
  AFDatePicker,
  AFSelectInfinite,
  BlockFormItem,
  MessagePanel,
} from "@/components";
import { EConversationTypes, images } from "@/constants";
import {
  useDebounce,
  useGetDetailsReportTicket,
  useMutationUserProfile,
  useUserProfileById,
} from "@/hooks";
import { _common, _formatDay } from "@/utils";
import {
  Avatar,
  Button,
  Card,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  message,
  Space,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import Title from "antd/es/skeleton/Title";
import dayjs from "dayjs";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
const ProfilePage = ({ params }: TDetailPage) => {
  const ref = useRef<TModalRef>(null);
  const { reportTicket, isLoading } = useGetDetailsReportTicket(params?.id);

  return (
    <div className="flex gap-6 p-6 max-w-6xl mx-auto w-full">
      <div className="flex-1">
        <h2 className="mb-4 text-[40px] text-blue-600">Report Ticket</h2>

        {/* Reporter Section */}
        <Card className="mb-6">
          <h5 className="text-xl">Reporter</h5>
          <Space size={64}>
            <Avatar size={64} src={images.DEFAULT_AVATAR} />
            <div>
              <p>{`${reportTicket?.reporter.user.lastName} ${reportTicket?.reporter.user.firstName}`}</p>
              <br />
              <p>
                reproted at:{" "}
                {_formatDay.formatDDMMYYYY(reportTicket?.created_at)}
              </p>
            </div>
          </Space>
        </Card>

        {/* Reportee Section */}
        <Card className="mb-6">
          <h5 className="text-xl">Reportee</h5>
          <Space size={64}>
            <Avatar size={64} src={images.DEFAULT_AVATAR} />
            <div>
              <p>{`${reportTicket?.reportee.user.lastName} ${reportTicket?.reportee.user.firstName}`}</p>
              <br />
              <p>{`Reported count: ${reportTicket?.reportee?.reportedCount}`}</p>
            </div>
          </Space>
        </Card>

        {/* Content Section */}
        <Card className="mb-6">
          <h5 className="text-xl">Report Content</h5>
          <h6 className="text-lg">Type: {reportTicket?.type}</h6>
          <Card size="small" className="mb-4">
            <MessagePanel
              conversation={reportTicket?.conversation}
              type={EConversationTypes.PRIVATE}
            />
          </Card>
          <Button type="primary" danger>
            {`Delete ${reportTicket?.type}`}
          </Button>
        </Card>
      </div>

      {/* Actions Section */}
      <div className="w-80">
        <h2 className="mb-4 text-[40px] text-blue-600">Actions</h2>
        <Space direction="vertical" className="w-full">
          <Card>
            <h5>Accept ticket</h5>
            <p className="block mb-4">
              The content will be removed and the user will be notified.
            </p>
            <Button type="primary" block>
              Accept
            </Button>
          </Card>

          <Card>
            <h5>Reject ticket</h5>
            <p className="block mb-4">
              The report will be closed with no action taken.
            </p>
            <Button danger block>
              Reject
            </Button>
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default ProfilePage;
