 
import React, { useState } from "react";
import { Typography, Card, Button, Input, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  CarOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import RCCWithChallanCard from "../components/RCCWithChallanCard";

const { Title, Paragraph } = Typography;

// ✅ Backend se fetch karna
const fetchRCDetails = async (rcNumber) => {
  const res = await fetch(`https://api.vahansolution.co.in/api/rc/rcwithchallan/${rcNumber}`); // apna backend endpoint
  if (!res.ok) {

  const errorData = await res.json().catch(() => ({
        message: "Something went wrong!",
      }));

      // Toast dikhao
      toast.error(errorData.message || "Failed to fetch RC details");
       // Error throw karo taki upar handle kar sako
      throw new Error(errorData.message || "Failed to fetch RC details");
  }
  const ss= await res.json();
  return ss
};

 



const renderObject = (data) => {
 
};



const RCFetch = () => {
  const navigate = useNavigate();
  const [rcNumber, setRCNumber] = useState("");
  const [submittedRC, setSubmittedRC] = useState("");

  const { data: rcData, isFetching , isLoading } = useQuery({
    queryKey: ["rcDetails", submittedRC],
    queryFn: () => fetchRCDetails(submittedRC),
    enabled: !!submittedRC,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (d) => toast.error( d.response.data.message ||  "Failed to fetch RC details"),
    onSuccess: () => toast.success("RC details fetched successfully"),
  });

  const handleFetchRC = () => {
    if (!rcNumber) return toast.error("Please enter RC number");
    setSubmittedRC(rcNumber);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-white text-black shadow-md fixed w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "red" }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={5} className="m-0 flex-1 text-center !text-red-600">
          Fetch RC Details With Challan
        </Title>
      </header>

      {/* Content */}
      <div className="mt-[55px] flex-1 overflow-y-auto   pb-8">
        {/* RC Input */}
        <section className="mb-4">
          <Input
            placeholder="Enter RC Number"
            value={rcNumber}
            onChange={(e) => setRCNumber(e.target.value)}
            className="mb-2"
          />
          <Button type="primary" loading={isLoading} className="bg-red-500" block onClick={handleFetchRC}>
            Fetch RC & Challan Details
          </Button>
        </section>

        {/* RC Details */}
        <section>
          {isFetching ? (
            <Skeleton active paragraph={{ rows: 12 }} />
          ) : (
            rcData && (
             
                <RCCWithChallanCard data={rcData}/>
               
            )
          )}
        </section>

      
      </div>
    </div>
  );
};

export default RCFetch;
