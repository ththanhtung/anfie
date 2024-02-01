"use client";
import { Layout } from "antd";
import React, { PropsWithChildren } from "react";
import { MenuSidebar } from "../shared";
import { routes } from "@/constants";
const { Sider } = Layout;

const LayoutMain = ({ children }: PropsWithChildren) => {
  return (
    <Layout className="main-layout">
      <Sider theme="light" width={250}>
        <MenuSidebar href={routes.HOME} />
      </Sider>
      {children}
    </Layout>
  );
};

export default LayoutMain;
