import React, { useState } from "react";
import { Button, List, Card, Typography, InputNumber, message } from "antd";
import {
  WalletOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const fetchBalance = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/wallet/balance/${userId}`);
  return res.json();
};

const fetchHistory = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/wallet/history/${userId}`);
  return res.json();
};

const Wallet = ({ user }) => {
  const [amount, setAmount] = useState(100);
  const navigate = useNavigate();

  const { data: balance } = useQuery({
    queryKey: ["wallet-balance", user?._id],
    queryFn: () => fetchBalance(user?._id),
  });

  const { data: history = [] } = useQuery({
    queryKey: ["wallet-history", user?._id],
    queryFn: () => fetchHistory(user?._id),
  });

  const sendMessageToWhatsapp = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:5000/api/wallet/add-funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, amount }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      window.location.href = data.payment_link || data.payment_session_id;
    },
    onError: () => message.error("Failed to create order"),
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-1">
      {/* Header */}
      <header className="flex items-center bg-white shadow-md px-2 py-3 fixed top-0 left-0 w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "red" }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={5} className="m-0 flex-1 text-center text-red-600">
          Wallet
        </Title>
      </header>

      <div className="mt-[65px] space-y-4 flex-1 overflow-y-auto">
        {/* Balance Card */}
        <Card className="rounded-2xl shadow-md text-center  bg-white">
          <WalletOutlined style={{ fontSize: 50, color: "#2563eb" }} />
          <Title level={3} className="mt-2">
            ₹{balance?.balance || 0}
          </Title>
          <Text type="secondary">Available Balance</Text>
        </Card>

        {/* Add Funds Card */}
        <Card className="rounded-2xl shadow-md bg-white p-4">
          <Title level={5}>Add Money</Title>
          <InputNumber
            min={50}
            value={amount}
            onChange={setAmount}
            className="w-full mb-2"
            size="large"
          />
          <Button
            type="primary"
            block
            icon={<PlusCircleOutlined />}
            onClick={() =>
              window.open(
                `https://wa.me/916291993644?text=Hey Admin, I want to credit ₹${amount} to my account (email ID: ${user.email}). Please share QR Code Or UPI Id`,
                "_blank"
              )
            }
            size="large"
          >
            Add Funds
          </Button>
        </Card>

        {/* Transaction History */}
        <Card className="rounded-2xl shadow-md bg-white flex-1 overflow-hidden  ">
          <Title level={5}>Transaction History</Title>
          <List
            className="h-[40vh] overflow-y-auto"
            dataSource={history}
            renderItem={(item) => (
              <List.Item className="py-2 border-b last:border-b-0">
                <div className="flex flex-col w-full">
                  {/* First row: Type and Amount */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">{item.type}</span>
                    <span className="text-sm">₹{item.amount}</span>
                  </div>

                  {/* Second row: Reason */}
                  {item.reason && (
                    <div className="mb-1">
                      <span className="text-gray-500 text-xs">
                        Reason: {item.reason}
                      </span>
                    </div>
                  )}

                  {/* Third row: Order ID and Date */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">
                      {item.orderId}
                    </span>
                    <span
                      className={`font-bold text-xs ${
                        item.status === "SUCCESS"
                          ? "text-green-500"
                          : item.status === "PENDING"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
