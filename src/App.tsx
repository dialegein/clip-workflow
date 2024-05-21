import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SnippetsOutlined,
  DatabaseOutlined,
  VideoCameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Result, theme } from "antd";
import Material from "./components/Material";
import Template from "./components/Template";
import Video from "./components/Video";

const { Header, Sider, Content } = Layout;

const ContentInner = ({ tab }: { tab: string }) => {
  switch (tab) {
    case "material":
      return <Material />;
    case "template":
      return <Template />;
    case "video":
      return <Video />;
    default:
      return (
        <Result
          icon={<SmileOutlined />}
          title="页面出错"
          extra={<Button type="primary">Next</Button>}
        />
      );
  }
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [tab, setTab] = useState<string>("video");

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(e) => {
            setTab(e.key);
          }}
          items={[
            {
              key: "material",
              icon: <DatabaseOutlined />,
              label: "素材管理",
            },
            {
              key: "template",
              icon: <SnippetsOutlined />,
              label: "模版管理",
            },
            {
              key: "video",
              icon: <VideoCameraOutlined />,
              label: "视频生成",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ContentInner tab={tab} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
