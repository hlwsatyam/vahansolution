// src/pages/Login.jsx
import React, { useState } from "react";
import { Form, Input, Button, Skeleton } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { logo } from "../LOCAL/VARIABLE";

const API_URL = "https://api.vahansolution.co.in/api";

const loginUser = async (values) => {
  const res = await axios.post(`${API_URL}/login`, values);
  return res.data;
};

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: loginUser, // v5: use `mutationFn` instead of passing function directly
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      toast.success('Login Successful!');
      navigate('/home');
    },
    onError: (error) => {
 
      toast.error(error?.response?.data?.message || 'Login Failed!');
    },
  });

  return (
    <div className="flex items-center justify-center  !h-screen bg-gradient-to-br from-black via-white to-red-600">
      

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/50 h-screen rounded-2xl shadow-2xl p-10 w-full "
      >
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
            form={form}
            name="login"
            layout="vertical"
            onFinish={(values) => mutation.mutate(values)}
          >
            <Form.Item
              name="email"
              label="Email Or Mobile"
              rules={[
                { required: true,   message: "Enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your email or mobile"
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
                loading={mutation.isPending}
                htmlType="submit"
                className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
                size="large"
              >
                Log In
              </Button>
            </Form.Item>

            
<p className="text-center text-gray-500">
  Don't have an account?{' '}
  <Link 
    to="/register" 
    className="text-red-600 hover:underline font-medium"
  >
    Register now!
  </Link>
</p>

<p className="text-center text-gray-500 mt-2">
  Forgot your password?{' '}
  <Link 
    to="/forgetpassword" 
    className="text-red-600 hover:underline font-medium"
  >
    Reset here
  </Link>
</p>

             
           
          </Form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
