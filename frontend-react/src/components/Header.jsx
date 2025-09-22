import React from "react";
import { Button } from "antd";
import { LogoutOutlined, WalletOutlined } from "@ant-design/icons";
import { logo } from "../LOCAL/VARIABLE";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-[60px] flex justify-between items-center px-4 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-[16px] font-bold my-0">Vahan Solution</p>
          <p className="text-[9px] pl-12 text-gray-500 my-0">
            Run Highway Without Tension
          </p>
        </div>
      </div>

      {/* Right: Wallet + Logout */}
      <div className="flex items-center space-x-4">
        {/* Wallet with balance badge */}
        <div
          className="flex items-center bg-blue-50 px-3 py-1 rounded-full shadow cursor-pointer hover:bg-blue-100 transition"
          onClick={() => navigate("/wallet")}
        >
          <WalletOutlined style={{ fontSize: 20, color: "#2563eb" }} />
          <span className="ml-2 text-sm font-semibold text-blue-700">
            ₹{user?.wallet_point || 0}
          </span>
        </div>

        {/* Logout */}
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
