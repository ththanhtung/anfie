import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useLogin } from "@/hooks";

const FormLogin = () => {
  const { onLoginUser, isPending } = useLogin();
  const onFinish = useCallback(
    (value: TFormLogin) => {
      onLoginUser({
        ...value,
      });
    },
    [onLoginUser]
  );
  return (
    <Form
      name="login"
      className="form-login"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "please input your email!" },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isPending}>
        Login
      </Button>
    </Form>
  );
};

export default FormLogin;
