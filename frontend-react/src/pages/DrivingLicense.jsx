import React, { useEffect, useState } from "react";
import { Typography, Card, Button, Input, Skeleton, DatePicker, Form, Row, Col, Collapse } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  IdcardOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Panel from "antd/es/splitter/Panel";
import LicenseCard from "../components/LicenseCard";
import { backend_url } from "../LOCAL/VARIABLE";

const { Title, Paragraph } = Typography;

// Backend se fetch karna
const fetchDrivingLicenseDetails = async (licenseData) => {
  const { licenseNumber, dob } = licenseData;
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
  const res = await fetch(`${backend_url}/api/rc/driving-license`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      driving_license_number: licenseNumber,
      date_of_birth: dob,
      consent: "Y",
      userId:user,
      source: 1
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({
      message: "Something went wrong!",
    }));

    toast.error(errorData.message || "Failed to fetch driving license details");
    throw new Error(errorData.message || "Failed to fetch driving license details");
  }
  
  return await res.json();
};












// const renderObject = (data ) => {
  
// };








const DrivingLicense = ({refetch}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const { data: licenseData, isFetching, isLoading } = useQuery({
    queryKey: ["drivingLicenseDetails", submittedData],
    queryFn: () => fetchDrivingLicenseDetails(submittedData),
    enabled: !!submittedData,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error) => toast.error(error.message || "Failed to fetch driving license details"),
    onSuccess: () => toast.success("Driving license details fetched successfully"),
  });


 useEffect(()=>{refetch()},[isLoading])


  const handleFetchLicense = (values) => {
    if (!values.licenseNumber || !values.dob) {
      toast.error("Please enter both license number and date of birth");
      return;
    }
    
    setSubmittedData({
      licenseNumber: values.licenseNumber,
      dob: dayjs(values.dob).format("YYYY-MM-DD")
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
          Driving License Verification
        </Title>
      </header>

      {/* Content */}
      <div className="mt-[55px] flex-1 overflow-y-auto  pb-8">
        {/* Driving License Input Form */}
        <section className="mb-6">
          <Card className="rounded-lg shadow-md">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFetchLicense}
              autoComplete="off"
            >
              <Form.Item
                label="Driving License Number"
                name="licenseNumber"
                rules={[
                  { required: true, message: "Please enter driving license number" }
                ]}
              >
                <Input 
                  prefix={<IdcardOutlined className="text-gray-400" />}
                  placeholder="e.g., TS12XXXXXXXXXXX" 
                  size="large"
                  className="rounded-md"
                />
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[
                  { required: true, message: "Please select date of birth" }
                ]}
              >
                <DatePicker
                  prefix={<CalendarOutlined className="text-gray-400" />}
                  placeholder="Select date of birth"
                  size="large"
                  className="w-full rounded-md"
                  format="YYYY-MM-DD"
                />
              </Form.Item>

              <Button 
                type="primary" 
                loading={isLoading} 
                htmlType="submit"
                className="bg-red-500 hover:bg-red-600 w-full rounded-md h-10 font-semibold"
              >
                Fetch Driving License Details
              </Button>
            </Form>
          </Card>
        </section>

        {/* Driving License Details */}
        <section>
          {isFetching ? (
            <Card className="rounded-lg shadow-md">
              <Skeleton active paragraph={{ rows: 8 }} />
            </Card>
          ) : (
            licenseData && (
            
                <LicenseCard data={licenseData} />
              
            )
          )}
        </section>
      </div>
    </div>
  );
};

export default DrivingLicense;




 
 
  