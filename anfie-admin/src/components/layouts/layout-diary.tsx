"use client";
import { Col, Row } from "antd";
import React, { PropsWithChildren, ReactNode } from "react";
type TProps = PropsWithChildren & {
  renderLeft: ReactNode;
};
const LayoutDiary = ({ renderLeft, children }: TProps) => {
  return (
    <Row className="w-full bg-slate-100">
      <Col xs={4} md={5} lg={14} className="h-full">
        {renderLeft}
      </Col>
      <Col xs={20} md={12} lg={10} className="fixed right-0 w-[35%]">
        {children}
      </Col>
    </Row>
  );
};

export default LayoutDiary;
