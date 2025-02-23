"use client";
import { MessagePanel, PostItem } from "@/components";
import { EConversationTypes, EReportTicketStatus, images } from "@/constants";
import { useGetDetailsReportTicket, useMutationReportTicket } from "@/hooks";
import { _common, _formatDay } from "@/utils";
import { Avatar, Button, Card, Space } from "antd";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
const ProfilePage = ({ params }: TDetailPage) => {
  const ref = useRef<TModalRef>(null);
  const { reportTicket, isLoading } = useGetDetailsReportTicket(params?.id);
  const {
    onAcceptReportTicket,
    onRejectReportTicket,
    isLoading: isActionLoading,
  } = useMutationReportTicket();
  const router = useRouter();

  return (
    <div className="flex gap-6 p-6 max-w-6xl mx-auto w-full">
      <div className="flex-1">
        <h2 className="mb-4 text-[40px] text-blue-600">Report Ticket</h2>

        {/* Reporter Section */}
        <Card className="mb-6">
          <h5 className="text-xl">Reporter</h5>
          <Space size={64} className="flex justify-between">
            <div className="flex gap-8 items-center">
              <Avatar size={64} src={images.DEFAULT_AVATAR} />
              <div>
                <p>{_common.getUserFullName(reportTicket?.reporter?.user!)}</p>
                <br />
                <p>
                  reproted at:{" "}
                  {_formatDay.formatDDMMYYYY(reportTicket?.created_at)}
                </p>
              </div>
            </div>
            <Button
              className="capitalize text-end"
              type="primary"
              onClick={() =>
                router.push(`/users/${reportTicket?.reporter?.user?.id}`)
              }
            >
              go to profile
            </Button>
          </Space>
        </Card>

        {/* Reportee Section */}
        <Card className="mb-6">
          <h5 className="text-xl">Reportee</h5>
          <Space size={64} className="flex justify-between">
            <div className="flex gap-8 items-center">
              <Avatar size={64} src={images.DEFAULT_AVATAR} />
              <div>
                <p>{_common.getUserFullName(reportTicket?.reportee?.user!)}</p>
                <br />
                <p>{`Reported count: ${reportTicket?.reportee?.reportedCount}`}</p>
              </div>
            </div>
            <Button
              className="capitalize"
              type="primary"
              onClick={() =>
                router.push(`/users/${reportTicket?.reportee?.user?.id}`)
              }
            >
              go to profile
            </Button>
          </Space>
        </Card>

        {/* Content Section */}
        <Card className="mb-6">
          <h5 className="text-xl uppercase">Report Content</h5>
          <h6 className="text-lg">
            Type: <span className="text-blue-600">{reportTicket?.type}</span>
          </h6>
          <Card size="small" className="mb-4">
            {reportTicket?.type !== "post" ? (
              <div className="h-[400px]">
                <MessagePanel
                  conversation={reportTicket?.conversation}
                  type={EConversationTypes.PRIVATE}
                />
              </div>
            ) : (
              <div>
                <PostItem
                  key={reportTicket?.post?.id}
                  post={reportTicket?.post!}
                />
              </div>
            )}
          </Card>
          {reportTicket?.type === "post" && (
            <Button type="primary" danger>
              Delete Post
            </Button>
          )}
        </Card>
      </div>

      {/* Actions Section */}
      <div className="w-80">
        <h2 className="mb-4 text-[40px] text-blue-600">Actions</h2>
        <Space direction="vertical" className="w-full">
          {reportTicket?.status === EReportTicketStatus.PENDING ? (
            <div>
              <Card>
                <h5>Accept ticket</h5>
                <p className="block mb-4">
                  The content will be removed and the user will be notified.
                </p>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    onAcceptReportTicket({
                      ticketId: params?.id,
                      cb: () => {
                        router.push("/report-tickets");
                      },
                    });
                  }}
                  disabled={isActionLoading}
                >
                  Accept
                </Button>
              </Card>
              <Card>
                <h5>Reject ticket</h5>
                <p className="block mb-4">
                  The report will be closed with no action taken.
                </p>
                <Button
                  danger
                  block
                  disabled={isActionLoading}
                  onClick={() => {
                    onRejectReportTicket({
                      ticketId: params?.id,
                      cb: () => {
                        router.push("/report-tickets");
                      },
                    });
                  }}
                >
                  Reject
                </Button>
              </Card>
            </div>
          ) : (
            <Card>
              <h5>Report Status</h5>
              <p>{`Status: ${reportTicket?.status}`}</p>
            </Card>
          )}
        </Space>
      </div>
    </div>
  );
};

export default ProfilePage;
