import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Space, 
  Statistic,
  Row,
  Col,
  Divider,
  Skeleton,
  Alert,
  ConfigProvider,
  Spin,
  message
} from 'antd';
import { 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  WalletOutlined,
  LogoutOutlined,
  PlusOutlined,
  LockOutlined
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;

const WalletManagementSystem = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check if admin is already logged in
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Search user query
  const searchUser = async (identifier) => {
    const response = await axios.get(`http://localhost:5000/api/wallet/search?identifier=${identifier}`);
    return response.data;
  };

  const searchUserQuery = useQuery({
    queryKey: ['user', form.getFieldValue('identifier')],
    queryFn: () => searchUser(form.getFieldValue('identifier')),
    enabled: false,
    retry: false,
  });

  // Update wallet mutation
  const updateWallet = async (updateData) => {
    const response = await axios.post('http://localhost:5000/api/wallet/update-wallet', updateData);
    return response.data;
  };

  const updateWalletMutation = useMutation({
    mutationFn: updateWallet,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', form.getFieldValue('identifier')]);
      form.setFieldsValue({ amount: '' });
      setUserData(data.user);
      toast.success(`Successfully added ${data.user.wallet_point - userData.wallet_point} points!`);
    },
    onError: (error) => {
      toast.error('Failed to update wallet: ' + (error.response?.data?.error || 'Server error'));
    }
  });

  const handleLogin = (values) => {
    if (values.username === 'admin' && values.password === 'admin123') {
      localStorage.setItem('adminData', JSON.stringify(values));
      setIsAuthenticated(true);
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials!');
    }
  };

  const handleSearch = () => {
    if (!form.getFieldValue('identifier')) {
      message.warning('Please enter user identifier');
      return;
    }
    searchUserQuery.refetch().then(({ data }) => {
      if (data) {
        setUserData(data);
      }
    });
  };

  const handleWalletUpdate = (values) => {
    if (!userData) return;
    
    updateWalletMutation.mutate({
      userId: userData._id,
      amount: values.amount
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminData');
    setIsAuthenticated(false);
    setUserData(null);
    form.resetFields();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        padding: '16px',
        background: '#f0f2f5'
      }}>
        <Card style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
          <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
            <UserOutlined style={{ fontSize: '48px', color: '#00b96b' }} />
            <Title level={2}>Admin Login</Title>
          </Space>
          <Form
            name="login"
            onFinish={handleLogin}
            autoComplete="off"
            layout="vertical"
            style={{ marginTop: '24px' }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter admin username" 
                size="large" 
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Enter password" 
                size="large" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
       
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', minHeight: '100vh', background: '#f0f2f5' }}>
      <Row justify="end" style={{ padding: '16px' }}>
        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Row>
      
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card>
            <Title level={2} style={{ textAlign: 'center' }}>
              Wallet Point Management
            </Title>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSearch}
              style={{ marginBottom: '24px' }}
            >
              <Form.Item
                name="identifier"
                label="Search User"
                rules={[{ required: true, message: 'Please enter email, mobile or username!' }]}
                help="Enter user's email, mobile number or username"
              >
                <Input 
                  placeholder="Email, mobile or username" 
                  size="large"
                  allowClear
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={searchUserQuery.isLoading}
                  block
                  size="large"
                >
                  Search User
                </Button>
              </Form.Item>
            </Form>
            
            <Divider />
            
            {searchUserQuery.isError && (
              <Alert
                message="User not found"
                description="Please check the entered details and try again."
                type="error"
                style={{ marginBottom: '16px' }}
                showIcon
                closable
              />
            )}
            
            {searchUserQuery.isLoading ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : userData ? (
              <div>
                <Row gutter={16} style={{ marginBottom: '24px' }}>
                  <Col span={12}>
                    <Statistic
                      title="Current Wallet Points"
                      value={userData.wallet_point}
                      prefix={<WalletOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="User Status"
                      value={userData.isVerified ? 'Verified' : 'Not Verified'}
                    />
                  </Col>
                </Row>
                
                <Divider />
                
                <Title level={4}>User Information</Title>
                <Space direction="vertical" style={{ width: '100%', marginBottom: '24px' }}>
                  <Text><UserOutlined /> Name: {userData.name}</Text>
                  <Text><MailOutlined /> Email: {userData.email}</Text>
                  <Text><PhoneOutlined /> Mobile: {userData.mobile}</Text>
                </Space>
                
                <Divider />
                
                <Form
                  onFinish={handleWalletUpdate}
                  layout="vertical"
                >
                  <Form.Item
                    name="amount"
                    label="Add Wallet Points"
                    rules={[{ 
                      required: true, 
                      message: 'Please enter amount!',
                    },
                    {
                      validator: (_, value) => {
                        if (value && value <= 0) {
                          return Promise.reject('Amount must be greater than 0');
                        }
                        return Promise.resolve();
                      }
                    }]}
                  >
                    <Input 
                      type="number" 
                      placeholder="Enter points to add" 
                      size="large"
                      prefix={<PlusOutlined />}
                      min="1"
                    />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={updateWalletMutation.isPending}
                      block
                      size="large"
                    >
                      Update Wallet
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
                <WalletOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <p>Enter user details to view and manage wallet points</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WalletManagementSystem;