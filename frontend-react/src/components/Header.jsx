import React from "react";
import { Button, Typography } from "antd";
import { LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { logo } from "../LOCAL/VARIABLE";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-[60px] flex justify-between items-center px-4 bg-white shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        <Title level={5} className="m-0 font-bold text-gray-800">
          Vahan Solution
        </Title>
      </div>

      <div className="flex items-center space-x-4">
      
        <Button
          type="text"
          icon={<LogoutOutlined style={{ fontSize: 22, color: "black" }} />}
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;
