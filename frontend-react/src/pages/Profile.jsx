import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Skeleton,
  Tag,
  Typography,
  Statistic,
  Space,
  Modal,
  Form,
  Input,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  WalletOutlined,
  CalendarOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";

// Reuse your existing components
import Header from "../components/Header";
import Footer from "../components/Footer";

const { Title, Paragraph, Text } = Typography;

const fetchMe = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://10.123.169.207:5000/api/user/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch profile");
  }
  return res.json();
};

const updateMe = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://10.123.169.207:5000/api/user/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update profile");
  }
  return res.json();
};

export default function Profile() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (e) => toast.error(e.message),
  });

  const user = data?.user;

  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      toast.success("Profile updated");
      setOpenEdit(false);
      qc.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (e) => toast.error(e.message),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const initialName = useMemo(() => user?.name || "", [user]);
  const joined = useMemo(
    () => (user?.createdAt ? new Date(user.createdAt).toLocaleString() : "-"),
    [user]
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header (you can reuse your existing Header component) */}
      <Header />

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-[80px] pt-[70px]">
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          user && (
            <div className="max-w-3xl mx-auto space-y-4">
              <Card
                className="rounded-2xl shadow-md"
                bodyStyle={{ padding: 20 }}
              >
                <div className="flex items-center gap-4">
                  <Avatar size={72} icon={<UserOutlined />} />
                  <div className="flex-1">
                    <Title level={4} className="m-0">
                      {user.name}
                    </Title>
                    <Space size="small" wrap>
                      <Tag icon={<MailOutlined />} color="processing">
                        {user.email}
                      </Tag>
                      {user.isVerified ? (
                        <Tag icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} color="success">
                          Verified
                        </Tag>
                      ) : (
                        <Tag icon={<CloseCircleTwoTone twoToneColor="#ff4d4f" />} color="error">
                          Not Verified
                        </Tag>
                      )}
                      <Tag icon={<CalendarOutlined />} color="default">
                        Joined: {joined}
                      </Tag>
                    </Space>
                  </div>

                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => {
                        form.setFieldsValue({ name: initialName });
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                     
                  </Space>
                </div>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="rounded-2xl shadow-md">
                  <Statistic
                    title="Wallet Points"
                    value={user.wallet_point ?? 0}
                    prefix={<WalletOutlined />}
                  />
                </Card>

                <Card className="rounded-2xl shadow-md">
                  <Statistic
                    title="Verification Status"
                    value={user.isVerified ? "Verified" : "Pending"}
                  />
                </Card>
              </div>

              <Card className="rounded-2xl shadow-md">
                <Title level={5} className="mb-2">
                  Details
                </Title>
                <Descriptions
                  bordered
                  size="small"
                  column={1}
                  labelStyle={{ width: 160 }}
                >
                  <Descriptions.Item label="Name">
                    {user.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {user.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Wallet Points">
                    {user.wallet_point ?? 0}
                  </Descriptions.Item>
                  <Descriptions.Item label="Verified">
                    {String(!!user.isVerified)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Updated At">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleString()
                      : "-"}
                  </Descriptions.Item>
                  
                </Descriptions>

                <Divider />

                <Paragraph type="secondary">
                  Keep your profile updated.
                </Paragraph>
              </Card>
            </div>
          )
        )}
      </main>

      {/* Footer with active tab */}
      <Footer active="profile" />

      {/* Edit Modal */}
      <Modal
        title="Edit Profile"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => mutateUpdate({ name: values.name?.trim() }))
            .catch(() => {});
        }}
        okText={isUpdating ? "Saving..." : "Save"}
        confirmLoading={isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Your name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
