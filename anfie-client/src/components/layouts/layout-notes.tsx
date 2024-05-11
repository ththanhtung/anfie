"use client";
import { Col, Row } from "antd";
import React, {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
} from "react";
type TProps = PropsWithChildren & {
  renderLeft: ReactNode;
};
const LayoutNote = ({ renderLeft, children }: TProps) => {
  return (
    <Row className="w-full bg-slate-100">
      <Col xs={4} md={5} lg={12} className="h-full">
        {renderLeft}
      </Col>
      <Col xs={20} md={12} lg={12}>
        {children}
      </Col>
    </Row>
  );
};

export default LayoutNote;
