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
        <QRCodeCanvas
          value={currentUrl}
          size={80}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={false}
        />
        <Text className="text-xs text-center mt-2 font-bold">WB02AL2885</Text>
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
                Virtual RC
              </Text>
            </div>

            <div className="flex justify-center mb-4">
              <GenerateQRCode />
            </div>
          </div>

          {/* Owner Details Section */}
          <div className="px-6 py-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <Title level={5} className="text-gray-800 font-semibold mb-0">
                  Owner Details
                </Title>
                <Text className="text-blue-600 text-sm font-medium">
                {data?.data?.rc_data?.owner_data?.name}
                </Text>
              </div>

              <InfoRow
                label="Son / Daughter / Wife of"
                value={data?.data?.rc_data?.owner_data?.father_name}
                isBlue={true}
              />
            </div>
            <Divider />
            {/* Vehicle Information */}
            <div className="mb-6">
              <div className="mb-6">
                {data?.data?.rc_data?.vehicle_data?.chassis_number && (
                  <InfoRow
                    label="Chassis No."
                    value={data?.data?.rc_data.vehicle_data.chassis_number}
                    isBlue={true}
                  />
                )}
                {data?.data?.rc_data?.vehicle_data?.engine_number && (
                  <InfoRow
                    label="Engine No."
                    value={data?.data?.rc_data.vehicle_data.engine_number}
                  />
                )}
                {data?.data?.rc_data?.vehicle_data?.maker_description && (
                  <InfoRow
                    label="Maker Name"
                    value={data?.data?.rc_data.vehicle_data.maker_description}
                    isBlue={true}
                  />
                )}
                
 







{Array.isArray(data?.data?.challan_data) && (
  <div>
    {data.data.challan_data.map((d, index) => (
      <div key={index} className="mb-4 border-b pb-2">
        {d.document_id && (
          <InfoRow label="Document ID" value={d.document_id} isBlue />
        )}
        {d.status && <InfoRow label="Status" value={d.status} />}
        {d.area_name && (
          <InfoRow label="Area" value={d.area_name} isBlue />
        )}
        {d.date_issued && (
          <InfoRow label="Date Issued" value={d.date_issued} />
        )}
        {d.accused_name && (
          <InfoRow label="Accused Name" value={d.accused_name} isBlue />
        )}
        {d.owner_name && (
          <InfoRow label="Owner Name" value={d.owner_name} />
        )}
        {d.amount && (
          <InfoRow label="Amount" value={`₹${d.amount}`} isBlue />
        )}
        {d.rto_name && (
          <InfoRow label="RTO Name" value={d.rto_name} />
        )}
        {d.state && <InfoRow label="State" value={d.state} isBlue />}

        {/* Offence Data */}
        {Array.isArray(d.offence_data) &&
          d.offence_data.map((o, i) =>
            o.offence_description ? (
              <InfoRow
                key={i}
                label={`Offence (${o.offence_id || i + 1})`}
                value={o.offence_description}
              />
            ) : null
          )}

        {/* Receipt URL */}
        {d.receipt_url && (
          <InfoRow
            label="Receipt"
            value={
              d.receipt_url
            
            }
          />
        )}
      </div>
    ))}
  </div>
)}




















                {data?.data?.rc_data?.issue_date && (
                  <InfoRow
                    label="Registration Date"
                    value={data?.data?.rc_data.issue_date}
                  />
                )}
                {data?.data?.rc_data?.tax_end_date && (
                  <InfoRow
                    label="Tax valid up to"
                    value={data?.data?.rc_data.tax_end_date}
                  />
                )}
                {data?.data?.rc_data?.vehicle_data?.category && (
                  <InfoRow
                    label="Vehicle Class"
                    value={data?.data?.rc_data.vehicle_data.category}
                  />
                )}
                {data?.data?.rc_data?.vehicle_data?.fuel_type && (
                  <InfoRow
                    label="Fuel Type"
                    value={data?.data?.rc_data.vehicle_data.fuel_type}
                  />
                )}
                {data?.data?.rc_data?.vehicle_data?.color && (
                  <InfoRow
                    label="Color"
                    value={data?.data?.rc_data.vehicle_data.color}
                    isBlue={true}
                  />
                )}
                {data?.data?.rc_data?.vehicle_data?.seating_capacity && (
                  <InfoRow
                    label="Seat Capacity"
                    value={data?.data?.rc_data.vehicle_data.seating_capacity}
                  />
                )}
                {data?.data?.rc_data?.vehicle_data?.standing_capacity && (
                  <InfoRow
                    label="Standing Capacity"
                    value={data?.data?.rc_data.vehicle_data.standing_capacity}
                  />
                )}
                {data?.data?.rc_data?.financier && (
                  <InfoRow
                    label="Financer"
                    value={data?.data?.rc_data.financier}
                  />
                )}
                {data?.data?.rc_data?.insurance_data?.company && (
                  <InfoRow
                    label="Insurance Company"
                    value={data?.data?.rc_data.insurance_data.company}
                  />
                )}
                {data?.data?.rc_data?.insurance_data?.policy_number && (
                  <InfoRow
                    label="Insurance Policy No"
                    value={data?.data?.rc_data.insurance_data.policy_number}
                  />
                )}
                {data?.data?.rc_data?.insurance_data?.expiry_date && (
                  <InfoRow
                    label="Insurance Valid UpTo"
                    value={data?.data?.rc_data.insurance_data.expiry_date}
                  />
                )}
                {data?.data?.rc_data?.permit_data?.expiry_date && (
                  <InfoRow
                    label="Fitness UpTo"
                    value={data?.data?.rc_data.permit_data.expiry_date}
                  />
                )}
                {data?.data?.rc_data?.pucc_data?.pucc_number && (
                  <InfoRow
                    label="PUCC No."
                    value={data?.data?.rc_data.pucc_data.pucc_number}
                  />
                )}
                {data?.data?.rc_data?.pucc_data?.expiry_date && (
                  <InfoRow
                    label="PUCC Valid UpTo"
                    value={data?.data?.rc_data.pucc_data.expiry_date}
                  />
                )}
                {data?.data?.rc_data?.national_permit_data?.permit_number && (
                  <InfoRow
                    label="National Permit No."
                    value={
                      data?.data?.rc_data.national_permit_data.permit_number
                    }
                  />
                )}
                {data?.data?.rc_data?.national_permit_data?.expiry_date && (
                  <InfoRow
                    label="National Permit Valid UpTo"
                    value={data?.data?.rc_data.national_permit_data.expiry_date}
                  />
                )}
                {data?.data?.rc_data?.permit_data?.expiry_date && (
                  <InfoRow
                    label="State Permit Valid UpTo"
                    value={data?.data?.rc_data.permit_data.expiry_date}
                  />
                )}
                {data?.data?.rc_data?.registered_at && (
                  <InfoRow
                    label="Registering Authority"
                    value={data?.data?.rc_data.registered_at}
                  />
                )}
                {data?.data?.rc_data?.blacklist_status && (
                  <InfoRow
                    label="Black list status"
                    value={data?.data?.rc_data.blacklist_status}
                  />
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
