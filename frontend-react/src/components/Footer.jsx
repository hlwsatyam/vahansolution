import React from "react";
import { Button } from "antd";
import { CarOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Footer = ({ active = "home" }) => {
  const nsnig=useNavigate()
  return (
    <nav className="h-[60px] fixed bottom-0 w-full bg-white border-t shadow-md flex justify-around items-center z-50">
      {/* Home Button */}
      <Button
        type="text" onClick={()=>nsnig("/Home")}
        className={`flex flex-col items-center ${
          active === "home" ? "text-red-600" : "text-gray-600"
        }`}
      >
        <CarOutlined style={{ fontSize: 22 }} />
        <span className="text-xs">Home</span>
      </Button>

      {/* Profile Button */}
      <Button
        type="text"
        onClick={()=>nsnig("/Profile")}
        className={`flex flex-col items-center ${
          active === "profile" ? "text-red-600" : "text-gray-600"
        }`}
      >
        <UserOutlined style={{ fontSize: 22 }} />
        <span className="text-xs">Profile</span>
      </Button>
    </nav>
  );
};

export default Footer;
