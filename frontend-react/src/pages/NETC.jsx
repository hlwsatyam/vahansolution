// // import React from "react";
// // import { Button, Typography } from "antd";
// // import { ArrowLeftOutlined } from "@ant-design/icons";
// // import { useNavigate } from "react-router-dom";

// // const { Title } = Typography;

// // const LoadURL = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="flex flex-col h-screen bg-gradient-to-br from-white via-white to-red-600">
// //       {/* Header */}
// //       <header className="flex items-center px-4 py-3 bg-white text-black shadow-md fixed w-full z-50 h-[55px]">
// //         <Button
// //           type="text"
// //           icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "red" }} />}
// //           onClick={() => navigate(-1)}
// //         />
// //         <Title level={5} className="m-0 flex-1 text-center !text-red-600">
// //           NETC FASTag
// //         </Title>
// //       </header>

// //       {/* Iframe / Website Embed */}
// //       <div className="flex-1 mt-[55px]">
// //    <iframe
// //   src="https://www.netc.org.in/check-your-netc-fastag-status"
// //   title="NETC FASTag"
// //   className="w-full h-full border-0"
// // ></iframe>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoadURL;



// // import React, { useEffect } from "react";
// // import { Button, Typography } from "antd";
// // import { ArrowLeftOutlined } from "@ant-design/icons";
// // import { useNavigate } from "react-router-dom";

// // const { Title } = Typography;

// // const LoadURL = ({url}) => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Dusre tab me open karega
// //     window.open(
// //      "https://www.netc.org.in/check-your-netc-fastag-status",
// //       "_blank"
// //     );
// //   }, []);

// //   return (
// //     <div className="flex flex-col h-screen bg-gradient-to-br from-white via-white to-red-600">
// //       {/* Header */}
// //       <header className="flex items-center px-4 py-3 bg-white text-black shadow-md fixed w-full z-50 h-[55px]">
// //         <Button
// //           type="text"
// //           icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "red" }} />}
// //           onClick={() => navigate(-1)}
// //         />
// //         <Title level={5} className="m-0 flex-1 text-center !text-red-600">
// //           NETC FASTag
// //         </Title>
// //       </header>
// //     </div>
// //   );
// // };

// // export default LoadURL;



// import React, { useEffect, useState } from "react";
// import { Button, Typography, Input, Select, Form, Radio } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// const { Title } = Typography;
// const { Option } = Select;

// const LoadURL = ({ url }) => {
//   console.log(url)
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);
//   const [formType, setFormType] = useState( url==="roadtext" ? "roadtax" : "temporary"); // "temporary" | "roadtax"

//   useEffect(() => {
//     if (url) {
//       if (url.includes("roadtext")) {
//         setShowForm(true);
//       } else {
//         window.open(url, "_blank");
//       }
//     } else {
//       setShowForm(true);
//     }
//   }, [url]);

//   const handleWhatsAppSend = (values) => {
//     let message = "";

//     if (formType === "temporary") {
//       message = `*Temporary Permit Pay*
// Vehicle Number: ${values.vehicleNumber}
// Mobile Number: ${values.mobile}
// Permit Type: ${values.permitType}
// State: ${values.state}
// Duration: ${values.duration} Days`;
//     } else {
//       message = `*Road Tax Payment*
// Vehicle Number: ${values.vehicleNumber}
// Chassis Number: ${values.chassis}
// Duration: ${values.duration} Months
// Mobile Number: ${values.mobile}`;
//     }

//     const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-white to-red-600">
//       {/* Header */}
//       <header className="flex items-center px-4 py-3 bg-white text-black shadow-md fixed w-full z-50 h-[55px]">
//         <Button
//           type="text"
//           icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "red" }} />}
//           onClick={() => navigate(-1)}
//         />
//         <Title level={5} className="m-0 flex-1 text-center !text-red-600">
//           {formType === "temporary" ? "Temporary Permit Pay" : "Road Tax Payment"}
//         </Title>
//       </header>

//       {/* Form Section */}
//       {showForm && (
//         <div className="flex-1 flex justify-center items-center mt-[60px] px-4">
//           <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//             <Radio.Group
//               value={formType}
//               onChange={(e) => setFormType(e.target.value)}
//               className="mb-4"
//             >
//               <Radio value="temporary">Temporary Permit</Radio>
//               <Radio value="roadtax">Road Tax</Radio>
//             </Radio.Group>

//             <Form layout="vertical" onFinish={handleWhatsAppSend}>
//               {formType === "temporary" ? (
//                 <>
//                   <Form.Item
//                     name="vehicleNumber"
//                     label="Vehicle Number"
//                     rules={[{ required: true }]}
//                   >
//                     <Input />
//                   </Form.Item>
//                   <Form.Item name="mobile" label="Mobile Number" rules={[{ required: true }]}>
//                     <Input />
//                   </Form.Item>
//                   <Form.Item name="permitType" label="Permit Type" rules={[{ required: true }]}>
//                     <Select>
//                       <Option value="Temporary">Temporary</Option>
//                       <Option value="Other">Other</Option>
//                     </Select>
//                   </Form.Item>
//                   <Form.Item name="state" label="Select State" rules={[{ required: true }]}>
//                     <Select showSearch>
//                       {[
//                         "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
//                         "Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
//                         "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
//                         "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
//                         "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
//                         "Uttarakhand","West Bengal"
//                       ].map((st) => (
//                         <Option key={st} value={st}>{st}</Option>
//                       ))}
//                     </Select>
//                   </Form.Item>
//                   <Form.Item name="duration" label="Duration (Days)" rules={[{ required: true }]}>
//                     <Select>
//                       <Option value="7">7</Option>
//                       <Option value="14">14</Option>
//                       <Option value="21">21</Option>
//                       <Option value="28">28</Option>
//                     </Select>
//                   </Form.Item>
//                 </>
//               ) : (
//                 <>
//                   <Form.Item
//                     name="vehicleNumber"
//                     label="Vehicle Number"
//                     rules={[{ required: true }]}
//                   >
//                     <Input />
//                   </Form.Item>
//                   <Form.Item
//                     name="chassis"
//                     label="Chassis Number (Last 5 Digits)"
//                     rules={[{ required: true }]}
//                   >
//                     <Input />
//                   </Form.Item>
//                   <Form.Item name="duration" label="Duration (Months)" rules={[{ required: true }]}>
//                     <Select>
//                       <Option value="3">3</Option>
//                       <Option value="6">6</Option>
//                       <Option value="9">9</Option>
//                       <Option value="12">12</Option>
//                     </Select>
//                   </Form.Item>
//                   <Form.Item name="mobile" label="Mobile Number" rules={[{ required: true }]}>
//                     <Input />
//                   </Form.Item>
//                 </>
//               )}

//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="w-full bg-red-600 mt-2"
//               >
//                 Send via WhatsApp
//               </Button>
//             </Form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoadURL;



import React, { useEffect, useState } from "react";
import { Button, Typography, Input, Select, Form, Radio } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const LoadURL = ({ url }) => {
  console.log("URL from route:", url);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(
    url === "roadtext" ? "roadtax" : "temporary"
  ); // "temporary" | "roadtax"

  useEffect(() => {
    if (url) {
      if (url.includes("roadtext") || url.includes("tempr")) {
        setShowForm(true);
      } else {
        window.open(url, "_blank");
      }
    } else {
      window.open("https://www.netc.org.in/check-your-netc-fastag-status", "_blank");
    }
  }, [url]);

  const handleWhatsAppSend = (values) => {
    let message = "";

    if (formType === "temporary") {
      message = `*Temporary Permit Pay*
Vehicle Number: ${values.vehicleNumber}
Mobile Number: ${values.mobile}
Permit Type: ${values.permitType}
State: ${values.state}
Duration: ${values.duration} Days`;
    } else {
      message = `*Road Tax Payment*
Vehicle Number: ${values.vehicleNumber}
Chassis Number: ${values.chassis}
Duration: ${values.duration} Months
Mobile Number: ${values.mobile}`;
    }

    // ✅ Correct WhatsApp number
    const whatsappUrl = `https://wa.me/916291993644?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-white to-red-600">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-white text-black shadow-md fixed w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "red" }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={5} className="m-0 flex-1 text-center !text-red-600">
          {formType === "temporary"
            ? "Temporary Permit Pay"
            : "Road Tax Payment"}
        </Title>
      </header>

      {/* Form Section */}
      {showForm && (
        <div className="flex-1 flex justify-center items-center mt-[60px] px-4">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
            {/* Switch Form Type */}
            <Radio.Group
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="mb-4"
            >
              <Radio value="temporary">Temporary Permit</Radio>
              <Radio value="roadtax">Road Tax</Radio>
            </Radio.Group>

            {/* Form */}
            <Form layout="vertical" onFinish={handleWhatsAppSend}>
              {formType === "temporary" ? (
                <>
                  <Form.Item
                    name="vehicleNumber"
                    label="Vehicle Number"
                    rules={[{ required: true, message: "Enter vehicle number" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="mobile"
                    label="Mobile Number"
                    rules={[{ required: true, message: "Enter mobile number" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="permitType"
                    label="Permit Type"
                    rules={[{ required: true, message: "Select permit type" }]}
                  >
                    <Select>
                      <Option value="Temporary">Temporary</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="state"
                    label="Select State"
                    rules={[{ required: true, message: "Select state" }]}
                  >
                    <Select showSearch>
                      {[
                        "Andhra Pradesh",
                        "Arunachal Pradesh",
                        "Assam",
                        "Bihar",
                        "Chhattisgarh",
                        "Delhi",
                        "Goa",
                        "Gujarat",
                        "Haryana",
                        "Himachal Pradesh",
                        "Jharkhand",
                        "Karnataka",
                        "Kerala",
                        "Madhya Pradesh",
                        "Maharashtra",
                        "Manipur",
                        "Meghalaya",
                        "Mizoram",
                        "Nagaland",
                        "Odisha",
                        "Punjab",
                        "Rajasthan",
                        "Sikkim",
                        "Tamil Nadu",
                        "Telangana",
                        "Tripura",
                        "Uttar Pradesh",
                        "Uttarakhand",
                        "West Bengal",
                      ].map((st) => (
                        <Option key={st} value={st}>
                          {st}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="duration"
                    label="Duration (Days)"
                    rules={[{ required: true, message: "Select duration" }]}
                  >
                    <Select>
                      <Option value="7">7</Option>
                      <Option value="14">14</Option>
                      <Option value="21">21</Option>
                      <Option value="28">28</Option>
                    </Select>
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    name="vehicleNumber"
                    label="Vehicle Number"
                    rules={[{ required: true, message: "Enter vehicle number" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="chassis"
                    label="Chassis Number (Last 5 Digits)"
                    rules={[{ required: true, message: "Enter chassis number" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="duration"
                    label="Duration (Months)"
                    rules={[{ required: true, message: "Select duration" }]}
                  >
                    <Select>
                      <Option value="3">3</Option>
                      <Option value="6">6</Option>
                      <Option value="9">9</Option>
                      <Option value="12">12</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="mobile"
                    label="Mobile Number"
                    rules={[{ required: true, message: "Enter mobile number" }]}
                  >
                    <Input />
                  </Form.Item>
                </>
              )}

              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-red-600 mt-2"
              >
                Send via WhatsApp
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadURL;
