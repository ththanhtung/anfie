"use client";
import { FormLogin, FormSignup } from "@/components";
import { EActionTabs } from "@/constants";
import { Tabs, TabsProps } from "antd";
import React, { useRef } from "react";

const LoginPage = () => {
  const refTab = useRef<HTMLDivElement>(null);

  const items: TabsProps["items"] = [
    {
      key: EActionTabs.LOGIN,
      label: <span className="flex-center">Login</span>,
      children: <FormLogin />,
    },
    {
      key: EActionTabs.SIGNUP,
      label: <span className="flex-center">Signup</span>,
      children: <FormSignup />,
    },
  ];
  return (
    <div
      ref={refTab}
      className="w-full h-screen flex justify-center items-center "
    >
      <div className="w-full max-w-lg h-[80%] overflow-y-auto border rounded-lg p-4 ">
        <Tabs
          className="w-full"
          defaultActiveKey={EActionTabs.LOGIN}
          items={items}
          onTabClick={(key, event) => {
            refTab.current?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
