import React, { useRef } from "react";
import { Card, Typography, Button, Divider, Row, Col, Avatar, Tag } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  CarOutlined,
  ShareAltOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

const { Title, Text } = Typography;

const RCCWithChallanCard = ({ data }) => {
  const cardRef = useRef();

  const handleShare = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save("rc_challan_card.pdf");
  };

  const rc = data?.data?.rc_data || {};
  const owner = rc.owner_data || {};
  const challans = data?.data?.challan_data || [];

  const GenerateQRCode = () => {
    const currentUrl = window.location.href;
    return (
      <div className="qr-code-placeholder bg-white p-2 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <QRCodeCanvas value={currentUrl} size={100} level="H" includeMargin={true} />
        <p className="mt-1 text-[10px] text-gray-600 truncate max-w-[100px] text-center">
          {currentUrl}
        </p>
      </div>
    );
  };

  return (
    <div className="flex justify-center ">
      <Card
        ref={cardRef}
        className="w-full max-w-3xl shadow-2xl rounded-2xl border-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-5 flex justify-between items-center">
          <GenerateQRCode />
          <div className="text-right">
            <Avatar size={96} icon={<UserOutlined />} className="border-4 border-white" />
            <Title level={3} className="!text-white m-0 mt-2">
              {owner.name}
            </Title>
            <Text className="text-indigo-200">{rc.document_type}</Text>
          </div>
        </div>

        {/* RC Details */}
        <div className="p-5">
          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={12}>
              <div className="bg-indigo-50 p-3 rounded-xl">
                <Text strong className="text-indigo-700 flex items-center">
                  <UserOutlined className="mr-2" /> Father Name
                </Text>
                <p className="m-0 mt-1 font-medium">{owner.father_name}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-indigo-50 p-3 rounded-xl">
                <Text strong className="text-indigo-700 flex items-center">
                  <HomeOutlined className="mr-2" /> Present Address
                </Text>
                <p className="m-0 mt-1 font-medium">{owner.present_address}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-indigo-50 p-3 rounded-xl">
                <Text strong className="text-indigo-700 flex items-center">
                  <HomeOutlined className="mr-2" /> Permanent Address
                </Text>
                <p className="m-0 mt-1 font-medium">{owner.permanent_address}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-indigo-50 p-3 rounded-xl">
                <Text strong className="text-indigo-700 flex items-center">
                  <CalendarOutlined className="mr-2" /> Issue Date
                </Text>
                <p className="m-0 mt-1 font-medium">{rc.issue_date}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-indigo-50 p-3 rounded-xl">
                <Text strong className="text-indigo-700 flex items-center">
                  <CalendarOutlined className="mr-2" /> Expiry Date
                </Text>
                <p className="m-0 mt-1 font-medium">{rc.expiry_date}</p>
              </div>
            </Col>
          </Row>

          {/* Vehicle Details */}
          <div className="mb-4">
            <Title level={5} className="flex items-center text-indigo-800">
              <CarOutlined className="mr-2" /> Vehicle Details
            </Title>
            <Row gutter={[16, 16]}>
              {Object.entries(rc.vehicle_data || {}).map(([key, value]) => (
                <Col xs={12} key={key}>
                  <div className="bg-indigo-50 p-2 rounded-xl">
                    <Text strong className="text-indigo-700 capitalize">{key.replace(/_/g, ' ')}</Text>
                    <p className="m-0 mt-1 font-medium">{value?.toString()}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Insurance / Norms */}
          {rc.insurance_data && (
            <div className="mb-4">
              <Text strong className="text-indigo-700 flex items-center">
                <SafetyCertificateOutlined className="mr-2" /> Insurance Details
              </Text>
              {Object.entries(rc.insurance_data).map(([key, value]) => (
                <p key={key} className="m-0 ml-5 text-sm">
                  {key.replace(/_/g, ' ')}: {value?.toString()}
                </p>
              ))}
            </div>
          )}
          {rc.norms_type && (
            <div className="mb-4">
              <Text strong className="text-indigo-700 flex items-center">
                <FileTextOutlined className="mr-2" /> Norms Type
              </Text>
              <p className="m-0 ml-5 text-sm">{rc.norms_type}</p>
            </div>
          )}

          {/* Challan Section */}
          {challans.length > 0 && (
            <div className="mb-4">
              <Title level={5} className="flex items-center text-red-700">
                <FileTextOutlined className="mr-2" /> Challan Details
              </Title>
              {challans.map((ch, index) => (
                <div key={index} className="bg-red-50 p-3 rounded-xl mb-2 border-l-4 border-red-500">
                  <Text strong>Challan ID: {ch.document_id}</Text>
                  <p className="m-0 text-sm">Status: {ch.status}</p>
                  <p className="m-0 text-sm">Area: {ch.area_name}</p>
                  <p className="m-0 text-sm">RTO: {ch.rto_name}</p>
                  <p className="m-0 text-sm">Accused: {ch.accused_name}</p>
                  <p className="m-0 text-sm">Owner: {ch.owner_name}</p>
                  <p className="m-0 text-sm">Date Issued: {ch.date_issued}</p>
                  <p className="m-0 text-sm">Amount: ₹{ch.amount}</p>
                  {ch.offence_data?.map((o, i) => (
                    <p key={i} className="m-0 text-sm ml-5">
                      Offence: {o.offence_description}
                    </p>
                  ))}
                  {ch.receipt_url && (
                    <a href={ch.receipt_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                      View Receipt
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <Button
            type="primary"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            className="w-full rounded-xl h-12 bg-gradient-to-r from-red-600 to-red-800 border-0 shadow-md font-bold"
          >
            Export / Share RC + Challan
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RCCWithChallanCard;
