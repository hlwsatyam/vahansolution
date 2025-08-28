import React, { useRef } from "react";
import { Card, Typography, Button, Divider, Tag, Row, Col, Avatar } from "antd";
import {
  IdcardOutlined,
  UserOutlined,
  CalendarOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  CarOutlined,
  ShareAltOutlined,
  FileTextOutlined,
  QrcodeOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

const { Title, Text } = Typography;

const RCCard = ({ data }) => {
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

    pdf.save("rc_card.pdf");
  };

  const rc = data?.data?.rc_data || {};
  const owner = rc.owner_data || {};

  const GenerateQRCode = () => {
    const currentUrl = window.location.href;
    return (
      <div className="qr-code-placeholder bg-white   rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <QRCodeCanvas
          value={currentUrl}
          size={100}
          bgColor="#ffffff"
          fgColor="#1e3a8a"
          level="H"
          includeMargin={true}
        />
        <p className="mt-1 text-[10px] text-gray-600 truncate max-w-[100px] text-center">
          {currentUrl}
        </p>
      </div>
    );
  };

  return (
    <div className="flex justify-center p-4">
      <Card
        ref={cardRef}
        className="w-full max-w-md shadow-2xl rounded-2xl border-0 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-5 relative">
          <div className="flex items-center justify-between">
            <GenerateQRCode />
            <div>
              <Avatar
                size={96}
                icon={<UserOutlined />}
                className="border-4 border-white"
              />
              <Title level={3} className="!text-white m-0 mt-2">
                {owner.name}
              </Title>
              <Text className="text-green-200">{rc.document_type}</Text>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Owner Info */}
          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={12}>
              <div className="bg-green-50 p-3 rounded-xl">
                <Text strong className="text-green-700 flex items-center">
                  <UserOutlined className="mr-2" /> Father Name
                </Text>
                <p className="m-0 mt-1 font-medium">{owner.father_name}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-green-50 p-3 rounded-xl">
                <Text strong className="text-green-700 flex items-center">
                  <HomeOutlined className="mr-2" /> Present Address
                </Text>
                <p className="m-0 mt-1 font-medium">{owner.present_address}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-green-50 p-3 rounded-xl">
                <Text strong className="text-green-700 flex items-center">
                  <HomeOutlined className="mr-2" /> Permanent Address
                </Text>
                <p className="m-0 mt-1 font-medium">{owner.permanent_address}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-green-50 p-3 rounded-xl">
                <Text strong className="text-green-700 flex items-center">
                  <CalendarOutlined className="mr-2" /> Issue Date
                </Text>
                <p className="m-0 mt-1 font-medium">{rc.issue_date}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bg-green-50 p-3 rounded-xl">
                <Text strong className="text-green-700 flex items-center">
                  <CalendarOutlined className="mr-2" /> Expiry Date
                </Text>
                <p className="m-0 mt-1 font-medium">{rc.expiry_date}</p>
              </div>
            </Col>
          </Row>

          {/* RTA Details */}
          <div className="mb-4">
            <Text strong className="text-green-700 flex items-center mb-2">
              <EnvironmentOutlined className="mr-2" /> Registered At
            </Text>
            <p className="m-0 bg-gray-50 p-3 rounded-xl">{rc.registered_at}</p>
          </div>

          {/* Status */}
          <div className="mb-4">
            <Row gutter={[16, 16]}>
              <Col xs={12}>
                <div className="bg-green-100 p-3 rounded-xl border-l-4 border-green-500">
                  <Text strong className="text-green-800">Status</Text>
                  <p className="m-0 mt-1">{rc.status}</p>
                </div>
              </Col>
              <Col xs={12}>
                <div className="bg-green-100 p-3 rounded-xl border-l-4 border-red-500">
                  <Text strong className="text-red-800">Blacklist</Text>
                  <p className="m-0 mt-1">{rc.blacklist_status}</p>
                </div>
              </Col>
            </Row>
          </div>

          {/* Vehicle Info */}
          <div className="mb-4">
            <Title level={5} className="flex items-center text-green-800">
              <CarOutlined className="mr-2" /> Vehicle Details
            </Title>
            <Row gutter={[16, 16]}>
              {Object.entries(rc.vehicle_data || {}).map(([key, value]) => (
                <Col xs={12} key={key}>
                  <div className="bg-green-50 p-2 rounded-xl">
                    <Text strong className="text-green-700 capitalize">{key.replace(/_/g, ' ')}</Text>
                    <p className="m-0 mt-1 font-medium">{value?.toString()}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Permits, Insurance, PUCC */}
          <div className="mb-4">
            {rc.permit_data && (
              <div className="mb-2">
                <Text strong className="text-green-700 flex items-center">
                  <SafetyCertificateOutlined className="mr-2" /> Permit Data
                </Text>
                {Object.entries(rc.permit_data).map(([key, value]) => (
                  <p key={key} className="m-0 ml-5 text-sm">
                    {key}: {value?.toString()}
                  </p>
                ))}
              </div>
            )}
            {rc.national_permit_data && (
              <div className="mb-2">
                <Text strong className="text-green-700 flex items-center">
                  <SafetyCertificateOutlined className="mr-2" /> National Permit Data
                </Text>
                {Object.entries(rc.national_permit_data).map(([key, value]) => (
                  <p key={key} className="m-0 ml-5 text-sm">
                    {key}: {value?.toString()}
                  </p>
                ))}
              </div>
            )}
            {rc.insurance_data && (
              <div className="mb-2">
                <Text strong className="text-green-700 flex items-center">
                  <BankOutlined className="mr-2" /> Insurance Data
                </Text>
                {Object.entries(rc.insurance_data).map(([key, value]) => (
                  <p key={key} className="m-0 ml-5 text-sm">
                    {key}: {value?.toString()}
                  </p>
                ))}
              </div>
            )}
            {rc.pucc_data && (
              <div className="mb-2">
                <Text strong className="text-green-700 flex items-center">
                  <CarOutlined className="mr-2" /> PUCC Data
                </Text>
                {Object.entries(rc.pucc_data).map(([key, value]) => (
                  <p key={key} className="m-0 ml-5 text-sm">
                    {key}: {value?.toString()}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <Button
            type="primary"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            className="w-full rounded-xl h-12 bg-gradient-to-r from-green-600 to-green-800 border-0 shadow-md font-bold"
          >
            Export / Share RC
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RCCard;
