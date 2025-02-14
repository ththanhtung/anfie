import { EConversationTypes, EDropdownAction } from "@/constants";
import {
  MenuOutlined,
  PhoneOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiUserAddFill } from "react-icons/ri";

type TProps = {
  recipientName: string;
  recipient: TUser;
  conversation?: TConversation;
  group?: TGroupConversation;
  onCreate: () => void;
  onLeave: () => void;
  onAddRecipients: () => void;
  onShowAvatar: () => void;
  onEndConversation: () => void;
  onCreateFriendRequest?: () => void;
  type: EConversationTypes;
  onReport?: (conversationId: string) => void;
};

const MessagePanelHeader = ({
  recipientName,
  recipient,
  group,
  type,
  conversation,
  onCreate,
  onLeave,
  onAddRecipients,
  onShowAvatar,
  onEndConversation,
  onCreateFriendRequest,
  onReport,
}: TProps) => {
  const router = useRouter();

  const dropdownItems: MenuProps["items"] = useMemo(() => {
    if (conversation?.mode === "stranger") {
      return [
        {
          key: EDropdownAction.END_CONVERSATION,
          label: (
            <span className="text-red_400 text-sm ml-2 capitalize text-red-500">
              end conversation
            </span>
          ),
          icon: <span className="!text-base text-red_400 icon-trash" />,
        },
        {
          key: EDropdownAction.REPORT_CONVERSATION,
          label: (
            <span className="text-red_400 text-sm ml-2 capitalize text-red-500">
              report conversation
            </span>
          ),
          icon: <span className="!text-base text-red_400 icon-trash" />,
        },
      ];
    }

    return type === EConversationTypes.PRIVATE
      ? [
          {
            key: EDropdownAction.CREATE_GROUP,
            label: (
              <span className="text-neutral_800 text-sm ml-2 capitalize">
                create group
              </span>
            ),
            icon: <span className="!text-base text-neutral_700 icon-undo" />,
          },
        ]
      : [
          {
            key: EDropdownAction.GO_TO_GROUP_PAGE,
            label: (
              <span className="text-neutral_800 text-sm ml-2 capitalize">
                Go to group page
              </span>
            ),
            icon: <span className="!text-base text-neutral_700 icon-archive" />,
          },
          {
            key: EDropdownAction.ADD_RECIPIENT,
            label: (
              <span className="text-neutral_800 text-sm ml-2 capitalize">
                Add recipient
              </span>
            ),
            icon: <span className="!text-base text-neutral_700 icon-edit" />,
          },
          {
            key: EDropdownAction.LEAVE_GROUP,
            label: (
              <span className="text-neutral_800 text-sm ml-2 capitalize text-red-500">
                Leave group
              </span>
            ),
            icon: <span className="!text-base text-neutral_700 icon-archive" />,
          },
          // {
          //   key: EDropdownAction.MEMBERS,
          //   label: (
          //     <span className="text-neutral_800 text-sm ml-2 capitalize">
          //       members
          //     </span>
          //   ),
          //   icon: <span className="!text-base text-neutral_700 icon-archive" />,
          // },
        ];
  }, [type, conversation?.mode]);

  return (
    <div className="flex justify-between p-6 bg-sky-200">
      <div className="flex justify-center items-center gap-4">
        <Avatar icon={<UserOutlined />} size="large" />
        <p className="font-semibold text-blue-500 text-xl capitalize">
          {recipientName}
        </p>
      </div>
      <div className="flex justify-center items-center gap-4">
        {type !== EConversationTypes.GROUP &&
        recipientName &&
        conversation?.mode !== "friend" ? (
          <div className="flex gap-4 items-center">
            <Button
              type="primary"
              style={{
                backgroundColor: "#52DD68",
                alignItems: "center",
                display: "flex",
              }}
              icon={<FaRegCircleUser />}
              size="large"
              onClick={onShowAvatar}
            >
              View Others&apos; Photos
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#52DD68",
                alignItems: "center",
                display: "flex",
              }}
              icon={<RiUserAddFill />}
              size="large"
              onClick={onCreateFriendRequest}
            >
              Add Friend
            </Button>
          </div>
        ) : null}

        {/* <Button
          type="primary"
          shape="circle"
          style={{ backgroundColor: "#52DD68" }}
          icon={<PhoneOutlined />}
          size="large"
        />
        <Button
          type="primary"
          shape="circle"
          style={{ backgroundColor: "#52DD68" }}
          icon={<VideoCameraOutlined />}
          size="large"
        /> */}

        <Dropdown
          menu={{
            items: dropdownItems,
            onClick: (e) => {
              switch (e.key) {
                case EDropdownAction.CREATE_GROUP:
                  onCreate();
                  break;
                case EDropdownAction.END_CONVERSATION:
                  onEndConversation();
                  // onArchive();
                  break;
                case EDropdownAction.ADD_RECIPIENT:
                  onAddRecipients();
                  break;
                case EDropdownAction.LEAVE_GROUP:
                  onLeave();
                  break;
                case EDropdownAction.GO_TO_GROUP_PAGE:
                  console.log("navigate to group page", recipientName);

                  router.replace(
                    `${process.env.NEXT_PUBLIC_URL}/page/groups/${group?.id}`
                  );
                  break;
                case EDropdownAction.REPORT_CONVERSATION:
                  onReport?.(conversation?.id ?? "");
                  break;
                default:
                  // onUpdate();
                  break;
              }
            },
          }}
          className="cirle-header group"
          overlayStyle={{
            width: 200,
          }}
        >
          <Button
            style={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
            icon={<MenuOutlined />}
            size="large"
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default MessagePanelHeader;
