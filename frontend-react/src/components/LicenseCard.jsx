import React, { useRef } from "react";
import { Card, Typography, Button, Row, Col, Space, Divider } from "antd";
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
console.log(data)
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
      <div className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm border">
        <div className="flex flex-row items-center gap-12">
             <QRCodeCanvas
          value={currentUrl}
          size={80}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={false}
        />
  <img
  src={`data:image/jpeg;base64,${data?.data?.driving_license_data?.photo_base64}`}
  alt="Driving License"
  className="w-32 h-32 object-cover rounded"
/>
        </div>
     
        <Text className="text-xs text-center mt-2 font-bold">{data?.data?.driving_license_data?.document_id}</Text>
      </div>
    );
  };

  const InfoRow = ({ label, value, isBlue = true }) => (
    <Row className="mb-2 min-h-[32px] items-center border-b border-gray-100 pb-2">
      <Col>
        <Text className="text-sm font-medium text-gray-700">{label}</Text>
      </Col>
      <Col className="ml-auto">
        <Text
          className={`text-sm font-medium ${
            isBlue ? "text-blue-400" : "text-gray-900"
          }`}
        >
          {value || "N/A"}
        </Text>
      </Col>
    </Row>
  );

  return (
    <div className="flex justify-center p-4 bg-gray-50 min-h-screen">
      <div ref={cardRef} className="w-full max-w-lg bg-white">
        <Card
          className="shadow-lg rounded-lg border border-gray-200"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header with QR Code */}
          <div className="bg-white p-6 border-b border-gray-200">
            <div className="text-left mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Virtual Driving License
              </Text>
            </div>

            <div className="flex justify-center mb-4">
              <GenerateQRCode />
            </div>
          </div>

          {/* Owner Details Section */}
          <div className="px-6 py-4">
            
         
            {/* Vehicle Information */}
            <div className="mb-6">
              <div className="mb-6">
                {data?.data?.driving_license_data?.address && (
                  <InfoRow
                    label="Permanent Address"
                    value={data?.data?.driving_license_data?.address}
                    isBlue={true}
                  />
                )}







{data?.data?.driving_license_data && (
  <div className="mb-4 border-b pb-2">
    {data.data.driving_license_data.document_id && (
      <InfoRow label="Document ID" value={data.data.driving_license_data.document_id} isBlue />
    )}
    {data.data.driving_license_data.name && (
      <InfoRow label="Name" value={data.data.driving_license_data.name} />
    )}
    {data.data.driving_license_data.date_of_birth && (
      <InfoRow label="Date of Birth" value={data.data.driving_license_data.date_of_birth} isBlue />
    )}
    {data.data.driving_license_data.dependent_name && (
      <InfoRow label="Father/Dependent Name" value={data.data.driving_license_data.dependent_name} />
    )}
    {data.data.driving_license_data.address && (
      <InfoRow label="Permanent Address" value={data.data.driving_license_data.address} isBlue />
    )}
    {data.data.driving_license_data.pincode && (
      <InfoRow label="Pincode" value={data.data.driving_license_data.pincode} />
    )}

    {/* Validity */}
    {data.data.driving_license_data.validity?.non_transport?.issue_date && (
      <InfoRow
        label="Non-Transport Validity"
        value={`${data.data.driving_license_data.validity.non_transport.issue_date} - ${data.data.driving_license_data.validity.non_transport.expiry_date}`}
        isBlue
      />
    )}
    {data.data.driving_license_data.validity?.transport?.issue_date && (
      <InfoRow
        label="Transport Validity"
        value={`${data.data.driving_license_data.validity.transport.issue_date} - ${data.data.driving_license_data.validity.transport.expiry_date}`}
      />
    )}

    {/* RTO Details */}
    {data.data.driving_license_data.rto_details?.state && (
      <InfoRow label="State" value={data.data.driving_license_data.rto_details.state} isBlue />
    )}
    {data.data.driving_license_data.rto_details?.authority && (
      <InfoRow label="RTO Authority" value={data.data.driving_license_data.rto_details.authority} />
    )}

    {/* Vehicle Class Details */}
    {Array.isArray(data.data.driving_license_data.vehicle_class_details) &&
      data.data.driving_license_data.vehicle_class_details.map((v, i) => (
        <InfoRow
          key={i}
          label={`Vehicle Class (${v.category})`}
          value={v.authority}
          isBlue 
        />
      ))}

    {/* Blood Group */}
    {data.data.driving_license_data.blood_group && (
      <InfoRow label="Blood Group" value={data.data.driving_license_data.blood_group} />
    )}
  </div>
)}



               


              </div>
            </div>
          </div>

          {/* Footer */}
          <div className=" px-6 py-4 text-white">
            <div className="text-center mb-3">
              <Text className="text-blue-300  font-medium">
                Tap to Check the Vehicle Impound & Seizure Document Status
              </Text>
            </div>

            <div className="text-xs leading-relaxed">
              <Text className="text-black block mb-2">
                If status of pollution Certificate, Insurance, Tax etc. are not
                available above, same may be verified from physical documents
              </Text>

              <Text className="text-black block mb-3">
                <strong>Note:</strong> This information for the Certificate of
                Registration is generated by mParivahan app and data provided by
                the issuing authority in the National Register of Ministry of
                Road Transport and Highways-1010.This document is valid as per
                the IT Act 2000 of Ministry of Information Technology.
              </Text>
            </div>

            <Button
              type="primary"
              icon={<ShareAltOutlined />}
              onClick={handleShare}
              className="w-full rounded-lg h-12 bg-green-500 text-white text-lg border-0 font-semibold hover:bg-gray-100 mb-3"
            >
              share
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RCCard;
