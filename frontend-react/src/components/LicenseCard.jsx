// import React, { useRef } from "react";
// import { Card, Typography, Button, Row, Col, Space, Divider } from "antd";
// import {
//   IdcardOutlined,
//   UserOutlined,
//   CalendarOutlined,
//   HomeOutlined,
//   EnvironmentOutlined,
//   CarOutlined,
//   ShareAltOutlined,
//   FileTextOutlined,
//   QrcodeOutlined,
//   BankOutlined,
//   SafetyCertificateOutlined,
// } from "@ant-design/icons";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { QRCodeCanvas } from "qrcode.react";

// const { Title, Text } = Typography;

// const LicenseCard = ({ data }) => {
//   const cardRef = useRef();
// console.log(data)
//   const handleShare = async () => {
//     const element = cardRef.current;
//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//       scrollX: 0,
//       scrollY: 0,
//       windowWidth: document.documentElement.scrollWidth,
//       windowHeight: document.documentElement.scrollHeight,
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     let heightLeft = pdfHeight;
//     let position = 0;

//     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
//     heightLeft -= pdf.internal.pageSize.getHeight();

//     while (heightLeft > 0) {
//       position = heightLeft - pdfHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
//       heightLeft -= pdf.internal.pageSize.getHeight();
//     }

//     pdf.save("rc_card.pdf");
//   };

//   const rc = data?.data?.rc_data || {};
//   const owner = rc.owner_data || {};

//   const GenerateQRCode = () => {
//     const currentUrl = window.location.href;
//     return (
//       <div className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm border">
//         <div className="flex flex-row items-center gap-12">
//              <QRCodeCanvas
//           value={currentUrl}
//           size={80}
//           bgColor="#ffffff"
//           fgColor="#000000"
//           level="H"
//           includeMargin={false}
//         />
//   <img
//   src={`data:image/jpeg;base64,${data?.data?.driving_license_data?.photo_base64}`}
//   alt="Driving License"
//   className="w-32 h-32 object-cover rounded"
// />
//         </div>
     
//         <Text className="text-xs text-center mt-2 font-bold">{data?.data?.driving_license_data?.document_id}</Text>
//       </div>
//     );
//   };

//   const InfoRow = ({ label, value, isBlue = true }) => (
//     <Row className="mb-2 min-h-[32px] items-center border-b border-gray-100 pb-2">
//       <Col>
//         <Text className="text-sm font-medium text-gray-700">{label}</Text>
//       </Col>
//       <Col className="ml-auto">
//         <Text
//           className={`text-sm font-medium ${
//             isBlue ? "text-blue-400" : "text-gray-900"
//           }`}
//         >
//           {value || "N/A"}
//         </Text>
//       </Col>
//     </Row>
//   );

//   return (
//     <div className="flex justify-center p-4 bg-gray-50 min-h-screen">
//       <div ref={cardRef} className="w-full max-w-lg bg-white">
//         <Card
//           className="shadow-lg rounded-lg border border-gray-200"
//           bodyStyle={{ padding: 0 }}
//         >
//           {/* Header with QR Code */}
//           <div className="bg-white p-6 border-b border-gray-200">
//             <div className="text-left mb-4">
//               <Text className="text-lg font-semibold text-gray-800">
//                 Virtual Driving License
//               </Text>
//             </div>

//             <div className="flex justify-center mb-4">
//               <GenerateQRCode />
//             </div>
//           </div>

//           {/* Owner Details Section */}
//           <div className="px-6 py-4">
            
         
//             {/* Vehicle Information */}
//             <div className="mb-6">
//               <div className="mb-6">
//                 {data?.data?.driving_license_data?.address && (
//                   <InfoRow
//                     label="Permanent Address"
//                     value={data?.data?.driving_license_data?.address}
//                     isBlue={true}
//                   />
//                 )}







// {data?.data?.driving_license_data && (
//   <div className="mb-4 border-b pb-2">
//     {data.data.driving_license_data.document_id && (
//       <InfoRow label="Document ID" value={data.data.driving_license_data.document_id} isBlue />
//     )}
//     {data.data.driving_license_data.name && (
//       <InfoRow label="Name" value={data.data.driving_license_data.name} />
//     )}
//     {data.data.driving_license_data.date_of_birth && (
//       <InfoRow label="Date of Birth" value={data.data.driving_license_data.date_of_birth} isBlue />
//     )}
//     {data.data.driving_license_data.dependent_name && (
//       <InfoRow label="Father/Dependent Name" value={data.data.driving_license_data.dependent_name} />
//     )}
//     {data.data.driving_license_data.address && (
//       <InfoRow label="Permanent Address" value={data.data.driving_license_data.address} isBlue />
//     )}
//     {data.data.driving_license_data.pincode && (
//       <InfoRow label="Pincode" value={data.data.driving_license_data.pincode} />
//     )}

//     {/* Validity */}
//     {data.data.driving_license_data.validity?.non_transport?.issue_date && (
//       <InfoRow
//         label="Non-Transport Validity"
//         value={`${data.data.driving_license_data.validity.non_transport.issue_date} - ${data.data.driving_license_data.validity.non_transport.expiry_date}`}
//         isBlue
//       />
//     )}
//     {data.data.driving_license_data.validity?.transport?.issue_date && (
//       <InfoRow
//         label="Transport Validity"
//         value={`${data.data.driving_license_data.validity.transport.issue_date} - ${data.data.driving_license_data.validity.transport.expiry_date}`}
//       />
//     )}

//     {/* RTO Details */}
//     {data.data.driving_license_data.rto_details?.state && (
//       <InfoRow label="State" value={data.data.driving_license_data.rto_details.state} isBlue />
//     )}
//     {data.data.driving_license_data.rto_details?.authority && (
//       <InfoRow label="RTO Authority" value={data.data.driving_license_data.rto_details.authority} />
//     )}

//     {/* Vehicle Class Details */}
//     {Array.isArray(data.data.driving_license_data.vehicle_class_details) &&
//       data.data.driving_license_data.vehicle_class_details.map((v, i) => (
//         <InfoRow
//           key={i}
//           label={`Vehicle Class (${v.category})`}
//           value={v.authority}
//           isBlue 
//         />
//       ))}

//     {/* Blood Group */}
//     {data.data.driving_license_data.blood_group && (
//       <InfoRow label="Blood Group" value={data.data.driving_license_data.blood_group} />
//     )}
//   </div>
// )}



               


//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className=" px-6 py-4 text-white">
//             <div className="text-center mb-3">
//               <Text className="text-blue-300  font-medium">
//                 Tap to Check the Vehicle Impound & Seizure Document Status
//               </Text>
//             </div>

//             <div className="text-xs leading-relaxed">
//               <Text className="text-black block mb-2">
//                 If status of pollution Certificate, Insurance, Tax etc. are not
//                 available above, same may be verified from physical documents
//               </Text>

//               <Text className="text-black block mb-3">
//                 <strong>Note:</strong> This information for the Certificate of
//                 Registration is generated by mParivahan app and data provided by
//                 the issuing authority in the National Register of Ministry of
//                 Road Transport and Highways-1010.This document is valid as per
//                 the IT Act 2000 of Ministry of Information Technology.
//               </Text>
//             </div>

//             <Button
//               type="primary"
//               icon={<ShareAltOutlined />}
//               onClick={handleShare}
//               className="w-full rounded-lg h-12 bg-green-500 text-white text-lg border-0 font-semibold hover:bg-gray-100 mb-3"
//             >
//               share
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default LicenseCard;



import React, { useRef } from "react";
import { Card, Typography, Button, Row, Col, Divider } from "antd";
import {
  ShareAltOutlined,
  ArrowLeftOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import { mlogo } from "../LOCAL/VARIABLE";

const { Title, Text } = Typography;

const LicenseCard = ({ data }) => {
  const cardRef = useRef();
  console.log(data);

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

    pdf.save("driving_license.pdf");
  };

  const dlData = data?.data?.driving_license_data || {};

  const GenerateQRCode = () => {
    const currentUrl = window.location.href;
    return (
      <div className="flex flex-col items-center justify-center bg-white p-3 rounded-lg">
        <QRCodeCanvas
          value={currentUrl}
          size={80}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={false}
        />
        <Text className="text-xs text-center mt-2 font-bold">
          {dlData?.document_id}
        </Text>
      </div>
    );
  };

  const InfoRow = ({ label, value, isBlue = true }) => (
    <Row className="mb-2 min-h-[32px] items-center pb-2">
      <Col>
        <Text className="text-[12px] font-medium text-gray-700">{label}</Text>
      </Col>
      <Col className="ml-auto">
        <Text
          className={`text-[12px] font-medium ${
            isBlue ? "text-blue-400" : "text-gray-900"
          }`}
        >
          {value || "N/A"}
        </Text>
      </Col>
    </Row>
  );

  return (
    <div className="flex-col justify-center p-0 min-h-screen">
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
            src="https://play-lh.googleusercontent.com/YqOG9GBAB3n9Cw9NbkdlgcV8H1UuxqtotohizT8BjFK8QWVgjSEoEO1Gr-AyJMg5Tw"
            alt="logo"
            style={{ width: 40, height: 40, borderRadius: "50%", marginBottom: 2 }}
          />
          <div>
            <div className="" style={{ fontWeight: "lighter", fontSize: 15 }}>
              NextGen
            </div>
            <div className="font-bold" style={{ fontSize: 22 }}>
              mParivahan
            </div>
            <div
              className="font-extralight my-[0.5px]"
              style={{ fontSize: 8 }}
            >
              One Stop transport solution for citizen
            </div>
          </div>
        </div>

        {/* Refresh button */}
        <Button type="text" icon={<SyncOutlined />} />
      </div>

      <div
        ref={cardRef}
        className="w-full my-4 rounded-t-[150px] max-w-lg bg-transparent"
      >
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            overflow: "hidden",
          }}
        >
          {/* Header with QR Code */}
          <div className="bg- p-6 -b border-gray-200">
            <div className="text-left mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Virtual Driving License
              </Text>
            </div>

            <div className="flex justify-center mb-">
              <img width={"80%"} src={mlogo} />
            </div>
            <div className="flex justify-center">
              <Text className="text-xs text-center mt-2 font-extrabold">
                {dlData?.document_id}
              </Text>
            </div>
          </div>

          {/* License Holder Photo and QR Code */}
          <div className="flex justify-between px-6 py-4">
           <div className="flex justify-center items-center h-full w-full">
  <div className="flex flex-col justify-center items-center">
    {dlData?.photo_base64 && (
      <img
        src={`data:image/jpeg;base64,${dlData.photo_base64}`}
        alt="License Holder"
        className="w-24 h-24 object-cover rounded border"
      />
    )}
    <Text className="text-xs mt-2 font-medium text-center">
      {dlData?.name || "License Holder"}
    </Text>
  </div>
</div>
            
          </div>

          {/* License Details Section */}
          <div className="px-6 py-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <Title level={5} className="text-gray-800 font-semibold mb-0">
                  License Details
                </Title>
              </div>

              {dlData?.name && (
                <InfoRow label="Name" value={dlData.name}  isBlue={true} />
              )}
              {dlData?.dependent_name && (
                <InfoRow
                  label="Father/Dependent Name"
                  value={dlData.dependent_name}
                  isBlue={true}
                />
              )}
              {dlData?.date_of_birth && (
                <InfoRow
                  label="Date of Birth"
                  value={dlData.date_of_birth}
               isBlue={true}
                />
              )}
              {dlData?.blood_group && (
                <InfoRow
                  label="Blood Group"
                  value={dlData.blood_group}
                  isBlue={true}
                />
              )}

           

              {dlData?.address && (
                <InfoRow
                  label="Permanent Address"
                  value={dlData.address}
             isBlue={true}
                />
              )}
              {dlData?.pincode && (
                <InfoRow
                  label="Pincode"
                  value={dlData.pincode}
                  isBlue={true}
                />
              )}

         

              {/* Validity Information */}
              {dlData?.validity?.non_transport?.issue_date && (
                <InfoRow
                  label="Non-Transport Issue Date"
                  value={dlData.validity.non_transport.issue_date}
                isBlue={true}
                />
              )}
              {dlData?.validity?.non_transport?.expiry_date && (
                <InfoRow
                  label="Non-Transport Expiry Date"
                  value={dlData.validity.non_transport.expiry_date}
                  isBlue={true}
                />
              )}

              {dlData?.validity?.transport?.issue_date && (
                <InfoRow
                  label="Transport Issue Date"
                  value={dlData.validity.transport.issue_date}
                  isBlue={false}
                />
              )}
              {dlData?.validity?.transport?.expiry_date && (
                <InfoRow
                  label="Transport Expiry Date"
                  value={dlData.validity.transport.expiry_date}
                  isBlue={true}
                />
              )}

       

              {/* RTO Details */}
              {dlData?.rto_details?.state && (
                <InfoRow
                  label="State"
                  value={dlData.rto_details.state}
                 isBlue={true}
                />
              )}
              {dlData?.rto_details?.authority && (
                <InfoRow
                  label="RTO Authority"
                  value={dlData.rto_details.authority}
                  isBlue={true}
                />
              )}

           

              {/* Vehicle Class Details */}
              {Array.isArray(dlData.vehicle_class_details) &&
                dlData.vehicle_class_details.map((v, i) => (
                  <InfoRow
                    key={i}
                    label={`Vehicle Class (${v.category})`}
                    value={v.authority}
                   isBlue={true}
                  />
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 text-white">
            <div className="text-center mb-3">
              <Text className="text-blue-300 font-medium">
                Tap to Check the License Status & Violations
              </Text>
            </div>

            <div className="text-xs leading-relaxed">
              <Text className="text-black block mb-2">
                If status of license validity, endorsements, or other details
                are not available above, same may be verified from physical
                documents
              </Text>

              <Text className="text-black block mb-3">
                <strong>Note:</strong> This information for the Driving License
                is generated by mParivahan app and data provided by the issuing
                authority in the National Register of Ministry of Road Transport
                and Highways-1010. This document is valid as per the IT Act 2000
                of Ministry of Information Technology.
              </Text>
            </div>

            <Button
              type="primary"
              icon={<ShareAltOutlined />}
              onClick={handleShare}
              className="w-full rounded-lg h-12 bg-green-500 text-white text-lg border-0 font-semibold hover:bg-gray-100 mb-3"
            >
              Share
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LicenseCard;

