import React, { useRef } from "react";
import { Card, Typography, Button, Divider, Tag, Row, Col, Avatar } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  CarOutlined,
  ShareAltOutlined,
  HeartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

const { Title, Text } = Typography;

const LicenseCard = ({ data }) => {
  const cardRef = useRef();

  const handleShare = async () => {
    const element = cardRef.current;
    
    // Remove any transform properties that might affect positioning
    const originalTransform = element.style.transform;
    element.style.transform = 'none';
    
    const canvas = await html2canvas(element, {
      scale: 3, // Higher resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    // Restore original transform
    element.style.transform = originalTransform;
    
    const imgData = canvas.toDataURL("image/png", 1.0);
    
    // Calculate PDF dimensions to maintain aspect ratio
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight()-5;
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;
    
    pdf.addImage(
      imgData, 
      "PNG", 
      imgX, 
      imgY, 
      imgWidth * ratio, 
      imgHeight * ratio
    );
    pdf.save("driving_license.pdf");
  };

  const dl = data?.data?.driving_license_data || {};

  const GenerateQRCode = () => {
    const currentUrl = window.location.href;

    return (
      <div className="qr-code-placeholder visible h-full bg-white p-2 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <QRCodeCanvas
          value={currentUrl}
          size={120}
       
          bgColor="#ffffff"
          fgColor="#1e3a8a"
          level="H"
          includeMargin={true}
        />
        <p className="mt-1 text-[8px] text-gray-600 text-center max-w-[80px] truncate">
          {currentUrl}
        </p>
        <p className="  text-[8px] text-gray-600 text-center max-w-[80px] truncate">
         Vahan Solution
        </p>
      </div>
    );
  };

  return (
    <div className="flex justify-center p-4">
      <Card
        ref={cardRef}
        className="w-full max-w-md shadow-2xl rounded-2xl border-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* Header with QR Code */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-5 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
             
              <div className="ml-4">

 {dl.photo_base64 ? (
                <img
                  alt="Profile"
                  src={`data:image/jpeg;base64,${dl.photo_base64}`}
                  className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <Avatar
                  size={96}
                  icon={<UserOutlined />}
                  className="border-4 border-white"
                />
              )}


                <Title level={3} className="!text-white mt-4 m-0 !text-xl">
                  {dl.name || "Full Name"}
                </Title>
                <Text className="text-blue-200">{dl.document_id || "License Number"}</Text>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <GenerateQRCode />
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Basic Info */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={12}>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Text strong className="text-blue-700 flex items-center">
                  <CalendarOutlined className="mr-2" /> DOB
                </Text>
                <p className="m-0 mt-1 font-medium">{dl.date_of_birth || "DD/MM/YYYY"}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Text strong className="text-blue-700 flex items-center">
                  <CalendarOutlined className="mr-2" /> Dependent Name
                </Text>
                <p className="m-0 mt-1 font-medium">{dl?.dependent_name || "N/A"}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Text strong className="text-blue-700 flex items-center">
                  <CalendarOutlined className="mr-2" /> Pincode 
                </Text>
                <p className="m-0 mt-1 font-medium">{dl?.pincode || "N/A"}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Text strong className="text-blue-700 flex items-center">
                  <HeartOutlined className="mr-2" /> Docs Type
                </Text>
                <p className="m-0 mt-1 font-medium">{dl.document_type || "N/A"}</p>
              </div>
            </Col>
          </Row>

          {/* Address */}
          <div className="mb-6">
            <Text strong className="text-blue-700 flex items-center mb-2">
              <HomeOutlined className="mr-2" /> Address
            </Text>
            <p className="m-0 bg-gray-50 p-3 rounded-xl">{dl.address || "Full Address"}</p>
          </div>

          {/* RTO Details */}
          <div className="mb-6">
            <Text strong className="text-blue-700 flex items-center mb-2">
              <EnvironmentOutlined className="mr-2" /> State / RTO
            </Text>
            <p className="m-0 bg-gray-50 p-3 rounded-xl">
              {dl?.rto_details?.state || "State"}, {dl?.rto_details?.authority || "RTO Authority"}
            </p>
          </div>

          <Divider className="my-6" />

          {/* Validity */}
          <Title level={5} className="flex items-center text-blue-800">
            <CarOutlined className="mr-2" /> Validity
          </Title>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={12}>
              <div className="bg-blue-100 p-3 rounded-xl border-l-4 border-blue-500">
                <Text strong className="text-blue-800">
                  Non-Transport
                </Text>
                <p className="m-0 text-sm mt-1">
                  Issue: {dl?.validity?.non_transport?.issue_date || "DD/MM/YYYY"}
                </p>
                <p className="m-0 text-sm">
                  Expiry: {dl?.validity?.non_transport?.expiry_date || "DD/MM/YYYY"}
                </p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-green-100 p-3 rounded-xl border-l-4 border-green-500">
                <Text strong className="text-green-800">
                  Transport
                </Text>
                <p className="m-0 text-sm mt-1">
                  Issue: {dl?.validity?.transport?.issue_date || "DD/MM/YYYY"}
                </p>
                <p className="m-0 text-sm">
                  Expiry: {dl?.validity?.transport?.expiry_date || "DD/MM/YYYY"}
                </p>
              </div>
            </Col>
          </Row>

          <Divider className="my-6" />

          {/* Vehicle Classes */}
          <Title level={5} className="flex items-center text-blue-800">
            <FileTextOutlined className="mr-2" /> Vehicle Classes
          </Title>
          <div className="flex flex-wrap gap-2">
            {dl.vehicle_class_details?.length > 0 ? (
              dl.vehicle_class_details.map((v, i) => (
                <Tag
                  key={i}
                  color="blue"
                  className="px-3 py-1 rounded-xl shadow-sm border-0 font-medium"
                >
                  {v.category} ({v.authority})
                </Tag>
              ))
            ) : (
              <Tag color="blue" className="px-3 py-1 rounded-xl shadow-sm border-0 font-medium">
                No vehicle classes available
              </Tag>
            )}
          </div>
        </div>

        {/* Footer with Share Button */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <Button
            type="primary"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            className="w-full rounded-xl h-12 bg-gradient-to-r from-blue-600 to-blue-800 border-0 shadow-md font-bold"
          >
            Share / Export License
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LicenseCard;