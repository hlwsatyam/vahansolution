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
  ArrowLeftOutlined,
  ReloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import { mlogo, mprihanan } from "../LOCAL/VARIABLE";

const { Title, Text } = Typography;

const RCCard = ({ data }) => {
  const cardRef = useRef();
 console.log(data)
  // const handleShare = async () => {
  //   const element = cardRef.current;
  //   const canvas = await html2canvas(element, {
  //     scale: 2,
  //     useCORS: true,
  //     scrollX: 0,
  //     scrollY: 0,
  //     windowWidth: document.documentElement.scrollWidth,
  //     windowHeight: document.documentElement.scrollHeight,
  //   });

  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   let heightLeft = pdfHeight;
  //   let position = 0;

  //   pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  //   heightLeft -= pdf.internal.pageSize.getHeight();

  //   while (heightLeft > 0) {
  //     position = heightLeft - pdfHeight;
  //     pdf.addPage();
  //     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  //     heightLeft -= pdf.internal.pageSize.getHeight();
  //   }

  //   pdf.save("rc_card.pdf");
  // };







// const handleShare = async () => {
//   const element = cardRef.current;

//   // पूरा div को canvas में convert
//   const canvas = await html2canvas(element, {
//     scale: 2,
//     useCORS: true,
//     scrollX: 0,
//     scrollY: -window.scrollY, // scroll को ignore करने के लिए
//     windowWidth: document.documentElement.scrollWidth,
//     windowHeight: document.documentElement.scrollHeight,
//   });

//   const imgData = canvas.toDataURL("image/png");

//   // ✅ अगर मोबाइल/ब्राउज़र Web Share API सपोर्ट करता है
//   if (navigator.canShare && navigator.canShare({ files: [] })) {
//     const blob = await (await fetch(imgData)).blob();
//     const file = new File([blob], "rc_card.png", { type: "image/png" });

//     try {
//       await navigator.share({
//         files: [file],
//         title: "RC Card",
//         text: "Here is the virtual RC card",
//       });
//     } catch (err) {
//       console.log("Share canceled:", err);
//     }
//   } else {
//     // ✅ Fallback: सिर्फ download कर दो
//     const link = document.createElement("a");
//     link.href = imgData;
//     link.download = "rc_card.png";
//     link.click();
//   }
// };


  const pageRef = useRef(); 


// const handleShare = async () => {
//     const element = pageRef.current;

//     html2canvas से full page को image में बदलना
//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//       scrollX: 0,
//       scrollY: -window.scrollY, // scroll issue fix
//       windowWidth: document.documentElement.scrollWidth,
//       windowHeight: document.documentElement.scrollHeight,
//     });

//     const imgData = canvas.toDataURL("image/png");

//     ✅ अगर browser share सपोर्ट करता है
//     if (navigator.canShare && navigator.canShare({ files: [] })) {
//       const blob = await (await fetch(imgData)).blob();
//       const file = new File([blob], "rc_card.png", { type: "image/png" });

//       try {
//         await navigator.share({
//           files: [file],
//           title: "RC Card",
//           text: "Here is the virtual RC card",
//         });
//       } catch (err) {
//         console.log("Share canceled:", err);
//       }
//     } else {
//       ✅ fallback → download
//       const link = document.createElement("a");
//       link.href = imgData;
//       link.download = "rc_card.png";
//       link.click();
//     }
//   };


const handleShare = async () => {
  if (!pageRef.current) return;

  try {
    const canvas = await html2canvas(pageRef.current, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });

    // Convert canvas to Blob
    const imgData = canvas.toDataURL("image/png");
    const blob = await (await fetch(imgData)).blob();
    const file = new File([blob], "rc_card.png", { type: "image/png" });

    // ✅ अगर Web Share API सपोर्ट करता है → share
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "RC Card",
        text: "Here is the Virtual RC Card 🚘",
      });
    } else {
      alert("Sharing not supported on this device/browser");
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

  const rc = data?.data?.rc_data || {};
  const owner = rc.owner_data || {};

  const GenerateQRCode = () => {
    const currentUrl = window.location.href;
    return (
      <div className="flex flex-col items-center justify-center bg-white p-3 rounded-lg    ">
        <QRCodeCanvas
          value={currentUrl}
          size={80}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={false}
        />
        <Text className="text-xs text-center mt-2 font-bold">{data?.data?.rc_data?.document_id}</Text>
      </div>
    );
  };

  const InfoRow = ({ label, value, isBlue = true }) => (
    <Row className=" min-h-[32px] items-center    pb-2">
      <Col>
        <Text className="text-[12px] font-medium text-gray-700">{label}</Text>
      </Col>
      <Col className="ml-auto">
        <Text
          className={`text-[12px]  font-bold  ${
            isBlue ? "text-[#46bbec] " : "text-gray-900"
          }`}
        >
          {value || "N/A"}
        </Text>
      </Col>
    </Row>
  );

  return (
    <div  ref={pageRef} className="flex-col justify-center p-0   min-h-screen">









 <div
      className="flex items-center justify-between w-full px-4"
      style={{
        height: 66,
     
        color: "black",
      }}
    >
      {/* Back button */}
      <Button type="text" icon={<ArrowLeftOutlined />} />

      {/* Center logo & text */}
      <div className="flex flex-row gap-2 items-center">
        <img
          src={mprihanan}
          alt="logo"
         
          style={{ width: 40, height: 40, borderRadius: "50%", marginBottom: 2 }}
        />
        <div>
             <div  className="" style={{ fontWeight: "lighter", fontSize: 15 }}>NextGen</div>
        <div className="font-bold" style={{ fontSize: 22 }}>mParivahan</div>  
        <div className="font-extralight my-[0.5px]" style={{ fontSize: 8 }}>One Stop transport solution for citizen</div>  
        </div>
   
      </div>

      {/* Refresh button */}
      <Button type="text" icon={<SyncOutlined  />} />
    </div>



      <div ref={cardRef} className="w-full my-4 rounded-t-[150px]  max-w-lg bg-transparent ">
        <Card
        bodyStyle={{ padding: 0 }}
  style={{
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden", // ensures content respects rounded corners
  }}
        >
          {/* Header with QR Code */}
          <div className="bg-  p-6    -b border-gray-200">
            <div className="text-left mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Virtual RC
              </Text>
            </div>

            <div className="flex justify-center  ">
              <img width={'80%'} src={mlogo} />
              
            </div>
               <div style={{ marginTop: "-8px", marginBottom: "18px" }}  className="flex justify-center  ">
                  <Text    className="text-[12px] text-center mt-2 font-extrabold">{data?.data?.rc_data?.document_id}</Text>
               </div>
           
          </div>
<div className="flex justify-center">
  <div className="bg-sky-200/30 w-[95%] m-auto- h-2 ">

</div>
</div>



          {/* Owner Details Section */}
          <div className="px-6 py-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <Title level={5} className="text-gray-800 font-semibold mb-0">
                  Owner Details
                </Title>
               

              </div>
 <InfoRow
                label="Name"
                value={data?.data?.rc_data?.owner_data?.name}
                isBlue={true}
              />
              <InfoRow
                label="Son / Daughter / Wife of"
                value={data?.data?.rc_data?.owner_data?.father_name}
                isBlue={true}
              />
             
            </div>
         
            {/* Vehicle Information */}
            <div className="mb-6">
              <div className="mb-6">
                

   <Divider />
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
                {data?.data?.rc_data?.vehicle_data?.maker_model && (
                  <InfoRow
                    label="Model Name"
                    value={data?.data?.rc_data.vehicle_data.maker_model}
                  />
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
                {data?.data?.rc_data?.vehicle_data?.gross_weight && (
                  <InfoRow
                    label="GVW"
                    value={data?.data?.rc_data.vehicle_data.gross_weight}
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
              <Text className="text-[#249FD6]  font-medium">
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