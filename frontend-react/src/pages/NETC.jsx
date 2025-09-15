import React from "react";
import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoadURL = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white via-white to-red-600">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-white text-black shadow-md fixed w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "red" }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={5} className="m-0 flex-1 text-center !text-red-600">
          NETC FASTag
        </Title>
      </header>

      {/* Iframe / Website Embed */}
      <div className="flex-1 mt-[55px]">
   <iframe
  src="https://www.npci.org.in/what-we-do/netc-fastag/check-your-netc-fastag-status"
  title="NETC FASTag"
  className="w-full h-full border-0"
></iframe>
      </div>
    </div>
  );
};

export default LoadURL;
