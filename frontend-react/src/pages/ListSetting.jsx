import React, { useState } from 'react';
import { 
  List, 
  Card, 
  Switch, 
  Button, 
  Avatar, 
  Typography, 
  Divider,
  Modal,
  notification
} from 'antd';
import { 
  ArrowLeftOutlined, 
  UserOutlined, 
  LockOutlined, 
  DollarOutlined, 
  PhoneOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  EyeInvisibleOutlined,
  BellOutlined,
  SecurityScanOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SettingsPage = () => {
  const navigate = useNavigate();
 
   

  const settingsData = [
      {
      title: 'Contact Us',
      description: 'Get in touch with our support team',
      icon: <PhoneOutlined style={{ color: '#faad14' }} />,
      action: () => navigate('/contact'),
    },
    {
      title: 'Privacy Policy',
      description: 'View our data collection and usage policies',
      icon: <LockOutlined style={{ color: '#1890ff' }} />,
      action: () => navigate('/privacy'),
      // action: () => setPrivacyModalVisible(true),
    },
    {
      title: 'Terms & Conditions',
      description: 'View our Terms and Conditions',
      icon: <LockOutlined style={{ color: '#1890ff' }} />,
      action: () => navigate('/terms'),
      // action: () => setPrivacyModalVisible(true),
    },
    {
      title: 'Refund Policy',
      description: 'Learn about our cancellation and refund procedures',
      icon: <DollarOutlined style={{ color: '#52c41a' }} />,
      action: () => navigate('/cancle'),
      // action: () => setRefundModalVisible(true),
    },
  
     
  ];

 

  return (
       
            <List
              itemLayout="horizontal"
              dataSource={settingsData}
              renderItem={item => (
                <List.Item
                  actions={[<Button type="text" icon={<ArrowLeftOutlined rotate={180} />} />]}
                  className="px-2 hover:bg-blue-50 rounded-lg cursor-pointer"
                  onClick={item.action}
                >
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
      
  );
};

export default SettingsPage;