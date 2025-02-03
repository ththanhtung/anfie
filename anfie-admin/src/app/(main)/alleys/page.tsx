"use client";

import { use, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Card,
  List,
  Input,
  Button,
  Avatar,
  Typography,
  Space,
  theme,
  Image,
} from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  CommentOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useGetDetailsAlley,
  useGetDetailsPost,
  useListReportTicket,
  useMutationAlley,
} from "@/hooks";
import { _formatDay } from "@/utils";
import { images } from "@/constants";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const { Search } = Input;

export default function ModerationDashboard() {
  const { token } = theme.useToken();
  const [alleyUrl, setAlleyUrl] = useState("");
  const [alleyData, setAlleyData] = useState<TPost | null>(null);
  const [reportTickets, setReportTickets] = useState<
    TGetReportTicketsAdminResponse[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [alleyId, setAlleyId] = useState<string | undefined>();

  const { alley, isLoading: isAlleyLoading } = useGetDetailsAlley(alleyId);
  const {
    onDisableAlley,
    onEnableAlley,
    isLoading: isAlleyStatusLoading,
  } = useMutationAlley();

  function extractAlleyId(url: string): string | null {
    const parts = url.split("/");
    const alleyIndex = parts.indexOf("alleys");

    // Check if 'posts' segment exists and has a subsequent element
    if (alleyIndex === -1 || alleyIndex + 1 >= parts.length) {
      return null;
    }

    const postId = parts[alleyIndex + 1];
    return postId || null;
  }

  const handleSearch = async () => {
    const alleyId = extractAlleyId(alleyUrl);
    if (!alleyId) {
      // You might want to show an error message here
      setAlleyId(undefined);
      return;
    }

    setLoading(true);
    try {
      setAlleyId(alleyId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout style={{ background: token.colorBgLayout }}>
        <Content style={{ margin: "24px", minHeight: 280 }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <h1 className="text-center text-blue-600 text-[50px]">
              Manage Alleys
            </h1>
            <Search
              value={alleyUrl}
              onChange={(e) => setAlleyUrl(e.target.value)}
              placeholder="input alley url here"
              onSearch={handleSearch}
              enterButton
            />
            {alleyId && (
              <div>
                <Card>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <Text type="secondary">Alley ID: {alley?.id}</Text>
                        <Title level={4}>{alley?.title}</Title>
                        <Text type="secondary">
                          parent ID: {alley?.parentId}
                        </Text>
                      </div>
                      <Image
                        src={images.ALLEY}
                        alt="Cocktail"
                        style={{ maxWidth: 300, borderRadius: 8 }}
                      />
                    </div>
                    <div className="flex gap-2 align-middle">
                      {alley?.disabled ? (
                        <Button
                          type="primary"
                          onClick={() => {
                            onEnableAlley({ id: alley?.id ?? "" });
                          }}
                          loading={isAlleyStatusLoading}
                        >
                          Enable Alley
                        </Button>
                      ) : (
                        <Button
                          danger
                          onClick={() => {
                            onDisableAlley({ id: alley?.id ?? "" });
                          }}
                          loading={isAlleyStatusLoading}
                        >
                          Disable Alley
                        </Button>
                      )}
                    </div>
                  </Space>
                </Card>
                <Card></Card>
              </div>
            )}
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}
