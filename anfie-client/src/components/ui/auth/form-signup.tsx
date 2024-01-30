import { AFDatePicker } from "@/components";
import { _formatDay } from "@/utils";
import { Button, Form, Input } from "antd";
import React from "react";

const FormSignup = () => {
  const onFinish = () => {
    console.log("finish");
  };
  return (
    <Form
      name="signup"
      className="form-signup"
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
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" placeholder="Comfirm Password" />
      </Form.Item>
      <Form.Item
        name="date-of-birth"
        rules={[
          {
            required: true,
            message: "Please input you date of birth!",
          },
        ]}
      >
        <AFDatePicker placeholder="Date of Birth" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Sign up
      </Button>
    </Form>
  );
};

export default FormSignup;
