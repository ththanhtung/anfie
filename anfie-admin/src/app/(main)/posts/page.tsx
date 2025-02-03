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
import { useGetDetailsPost, useListReportTicket } from "@/hooks";
import { _formatDay } from "@/utils";
import { images } from "@/constants";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const { Search } = Input;

export default function ModerationDashboard() {
  const { token } = theme.useToken();
  const [postUrl, setPostUrl] = useState("");
  const [postData, setPostData] = useState<TPost | null>(null);
  const [reportTickets, setReportTickets] = useState<
    TGetReportTicketsAdminResponse[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState<string | undefined>();

  const { post, isLoading: isPostLoading } = useGetDetailsPost(postId);

  const {
    tickets,
    isTicketsLoading,
    page,
    limit,
    totalItems,
    handlePagination,
    setParams,
  } = useListReportTicket();

  function extractPostId(url: string): string | null {
    const parts = url.split("/");
    const postsIndex = parts.indexOf("posts");

    // Check if 'posts' segment exists and has a subsequent element
    if (postsIndex === -1 || postsIndex + 1 >= parts.length) {
      return null;
    }

    const postId = parts[postsIndex + 1];
    return postId || null;
  }

  const handleSearch = async () => {
    const postId = extractPostId(postUrl);
    if (!postId) {
      // You might want to show an error message here
      setPostId(undefined);
      return;
    }

    setLoading(true);
    try {
      setPostId(postId);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      postId: postId as string,
    }));
  }, [postId, setParams]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout style={{ background: token.colorBgLayout }}>
        <Content style={{ margin: "24px", minHeight: 280 }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Search
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="input post url here"
              onSearch={handleSearch}
              enterButton
            />
            {postId && (
              <div>
                <Card>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <Text type="secondary">Post ID: {post?.id}</Text>
                        <Title
                          level={4}
                        >{`By: ${post?.author?.lastName} ${post?.author?.firstName}`}</Title>
                        <Text type="secondary">{post?.content}</Text>
                      </div>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ju3rkL0J4oXPYMS1L4UuMdZVLUhVXq.png"
                        alt="Cocktail"
                        style={{ maxWidth: 300, borderRadius: 8 }}
                      />
                    </div>
                    <div className="flex gap-2 align-middle">
                      <Button type="default">View Post</Button>
                      <Button danger>Delete post</Button>
                    </div>
                  </Space>
                </Card>
                <Card>
                  <Title level={4}>Report Tickets</Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={tickets}
                    renderItem={(item) => (
                      <List.Item
                        extra={<Text type="secondary">{_formatDay.formatDDMMYYYYHH(item.created_at)}</Text>}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={images.DEFAULT_AVATAR}/>}
                          title={`Type: ${item.type}`}
                          description={item.content}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </div>
            )}
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}
