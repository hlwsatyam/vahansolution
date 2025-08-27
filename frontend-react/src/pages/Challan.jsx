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

const { Title, Paragraph } = Typography;

// ✅ Backend se fetch karna
const fetchRCDetails = async (rcNumber) => {
  const res = await fetch(
    `http://168.231.102.215:5000/api/rc/echallan/${rcNumber.rcNumber}/${rcNumber.chassis_number}/${rcNumber.engine_number}`
  ); // apna backend endpoint
  console.log(res)
  if (!res.ok) {

   const errorData = await res.json().catch(() => ({
        message: "Something went wrong!",
      }));

      // Toast dikhao
      toast.error(errorData.message || "Failed to fetch RC details");

      // Error throw karo taki upar handle kar sako
      throw new Error(errorData.message || "Failed to fetch RC details");

  }
  const ss = await res.json();
  return ss;
};

const renderObject = (data, level = 0) => {
  if (data === null || data === undefined) {
    return (
      <Paragraph style={{ marginLeft: level * 15 }} className="text-black">
        null
      </Paragraph>
    );
  }

  // Agar array hai
  if (Array.isArray(data)) {
    return data.map((item, index) => (
      <div key={index} style={{ marginLeft: level * 15 }}>
        <Paragraph strong className="text-black">
          [{index}]
        </Paragraph>
        {renderObject(item, level + 1)}
      </div>
    ));
  }

  // Agar object hai
  if (typeof data === "object") {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} style={{ marginLeft: level * 15 }}>
        <Paragraph strong className="text-black">
          {key}:
        </Paragraph>
        {renderObject(value, level + 1)}
      </div>
    ));
  }

  // Agar primitive value (string, number, boolean, etc.)
  return (
    <Paragraph style={{ marginLeft: level * 15 }} className="text-black">
      <strong>{String(data)}</strong>
    </Paragraph>
  );
};

const RCFetch = () => {
  const navigate = useNavigate();
  const [rcNumber, setRCNumber] = useState("");
  const [engine_number, setengine_number] = useState("");
  const [chassis_number, setchassis_number] = useState("");
  const [submittedRC, setSubmittedRC] = useState(null);

  const {
    data: rcData,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["rcDetails", submittedRC],
    queryFn: () => fetchRCDetails(submittedRC),
    enabled: !!submittedRC,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (d) =>
      toast.error(d.response.data.message || "Failed to fetch RC details"),
    onSuccess: () => toast.success("RC details fetched successfully"),
  });

  const handleFetchRC = () => {
    if (!rcNumber?.trim()) return toast.error("Please enter RC number");
    if (!chassis_number?.trim())
      return toast.error("Please enter chassis number");
    if (!engine_number?.trim())
      return toast.error("Please enter engine number");

    // Normalize inputs
    const normalizedRC = rcNumber.replace(/\s+/g, "").toUpperCase();
    const normalizedChassis = chassis_number.replace(/\s+/g, "").toUpperCase();
    const normalizedEngine = engine_number.replace(/\s+/g, "").toUpperCase();

    setSubmittedRC({
      rcNumber: normalizedRC,
      chassis_number: normalizedChassis,
      engine_number: normalizedEngine,
    });
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
          Challan
        </Title>
      </header>

      {/* Content */}
      <div className="mt-[55px] flex-1 overflow-y-auto p-4 pb-8">
        {/* RC Input */}
        <section className="mb-4">
          <Input
            placeholder="Enter RC Number"
            value={rcNumber}
            onChange={(e) => setRCNumber(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Enter engine Number"
            value={engine_number}
            onChange={(e) => setengine_number(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Enter chassis Number"
            value={chassis_number}
            onChange={(e) => setchassis_number(e.target.value)}
            className="mb-2"
          />
          <Button
            type="primary"
            loading={isLoading}
            className="bg-red-500"
            block
            onClick={handleFetchRC}
          >
            Challan Details
          </Button>
        </section>

        {/* RC Details */}
        <section>
          {isFetching ? (
            <Skeleton active paragraph={{ rows: 12 }} />
          ) : (
            rcData && (
              <Card className=" bg-red-500/50  text-white rounded-xl shadow-lg p-4">
                <Title level={5} className="text-black">
                  RC Details With challan
                </Title>
                {renderObject(rcData)}
              </Card>
            )
          )}
        </section>
      </div>
    </div>
  );
};

export default RCFetch;
