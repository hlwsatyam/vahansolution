import React, { useState } from "react";
import { Form, Input, Button, Skeleton, Typography } from "antd";
import { MailOutlined, LockOutlined, ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../LOCAL/VARIABLE";

const { Title } = Typography;
const API_URL = `${backend_url}/api`;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const navigate = useNavigate();

  // Request OTP
  const requestOtp = useMutation({
    mutationFn: (value) => axios.post(`${API_URL}/forgot-password`, value),
    onSuccess: () => {
      toast.success("OTP sent to your email!");
      setStep(2);
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Error!"),
  });

  // Reset Password
  const resetPass = useMutation({
    mutationFn: (value) => axios.post(`${API_URL}/reset-password`, value),
    onSuccess: () => {
      toast.success("Password reset successful!");
      navigate("/login");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Error!"),
  });

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gradient-to-br from-white via-white to-red-600">
      <Toaster />

      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-white text-black shadow-md fixed w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "red" }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={5} className="m-0 flex-1 text-center !text-red-600">
           Forgot Password
        </Title>
      </header>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="  rounded-2xl  p-10 w-full max-w-md mt-[80px]"
      >
        {step === 1 ? (
          <Form
            layout="vertical"
            onFinish={(values) => {
              setEmailOrMobile(values.emailOrMobile);
              requestOtp.mutate({ emailOrMobile: values.emailOrMobile });
            }}
          >
          

            <Form.Item
              name="emailOrMobile"
              label="Email or Mobile"
              rules={[{ required: true, message: "Enter your email or mobile!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter email or mobile"
                size="large"
                className="rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-300"
              />
            </Form.Item>

            <Form.Item className="flex justify-between items-center">
              

              <Button
                type="primary"
                loading={requestOtp.isPending}
                htmlType="submit"
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold text-lg rounded-lg shadow-lg"
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            layout="vertical"
            onFinish={(values) =>
              resetPass.mutate({ ...values, emailOrMobile })
            }
          >
            <h2 className="text-center text-2xl font-bold mb-6 text-red-700">
              Reset Password
            </h2>

            <Form.Item
              name="otp"
              label="OTP"
              rules={[{ required: true, message: "Enter OTP!" }]}
            >
              <Input placeholder="6-digit OTP" size="large" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, message: "Enter new password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="New password"
                size="large"
              />
            </Form.Item>

            <Form.Item className="flex justify-between items-center">
              <Button
                type="default"
                icon={<ArrowLeftOutlined />}
                onClick={() => setStep(1)}
                className="font-medium text-gray-700 hover:text-red-600 hover:underline"
              >
                Back
              </Button>

              <div className="flex gap-2 my-3">
                <Button
                  type="default"
                  icon={<ReloadOutlined />}
                  loading={requestOtp.isPending}
                  onClick={() => requestOtp.mutate({ emailOrMobile })}
                  className="font-medium text-gray-700 hover:text-red-600 hover:underline"
                >
                  Resend OTP
                </Button>

                <Button
                  htmlType="submit"
                  type="primary"
                  loading={resetPass.isPending}
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold text-lg rounded-lg shadow-lg"
                >
                  Reset Password
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
