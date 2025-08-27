// src/pages/Register.jsx
import React from "react";
import { Form, Input, Button, Skeleton } from "antd";
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";
import { logo } from "../LOCAL/VARIABLE";

const API_URL = "http://168.231.102.215:5000/api";

const registerUser = async (values) => {
  const res = await axios.post(`${API_URL}/register`, values);
  return res.data;
};

const Register = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    },
    onError: (error) => {
      
      toast.error(error?.response?.data?.message || "Registration failed!");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-white to-red-600">
       

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="  rounded-2xl h-screen shadow-2xl p-10 w-full   relative"
      >
        {/* Back button */}
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="absolute top-6 left-4 text-red-600 font-bold"
          onClick={() => navigate(-1)}
        />

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <motion.img
            src={logo}
            alt="Vahan Solution Logo"
            className="w-28 h-28 rounded-full object-cover shadow-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>

        {/* Skeleton while loading */}
        {mutation.isPending ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <Form
            name="register"
            layout="vertical"
            onFinish={(values) => mutation.mutate(values)}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Enter your name!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Full Name"
                size="large"
                className="rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-300"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
                className="rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-300"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Enter your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                className="rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-300"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
                size="large"
                loading={mutation.isPending}
              >
                Register
              </Button>
            </Form.Item>

            <p className="text-center text-gray-500 mt-2">
              Already have an account?{" "}
              <span
                className="text-red-600 hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </Form>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
