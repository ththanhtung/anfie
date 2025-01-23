import { Col, Row } from "antd";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

const LayoutAuth = ({ children }: PropsWithChildren) => {
  return (
    <Row className="login-wrapper">
      <Col md={12}>
        <div className="right-panel">admin</div>
      </Col>
      <Col md={12}>
        <Row align={"middle"} justify={"center"} className="login-right-panel">
          <Col md={10}>{children}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LayoutAuth;
