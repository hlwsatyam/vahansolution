import React from "react";
import { Carousel, Typography, Skeleton, Card } from "antd";
import { motion } from "framer-motion";
import {
  CarOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  MobileOutlined,
  UsergroupAddOutlined,
  ThunderboltOutlined,
  SmileOutlined,
  CustomerServiceOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { s1, s2, s3, s4, s5, s6, s7 } from "../LOCAL/VARIABLE";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const HomeContent = ({ user, services, isLoading }) => {
  const navigate = useNavigate();



const stats = [
  { value: "10000+", label: "Happy Customers", icon: <SmileOutlined /> },
  { value: "24/7", label: "Customer Support", icon: <CustomerServiceOutlined /> },
  { value: "99%", label: "Customer Satisfaction", icon: <LikeOutlined /> },
];












  return (
    <main className="flex-1 overflow-y-auto mt-[60px] mb-[60px]">
      {/* Carousel */}
      <Carousel autoplay>
        {[s1, s2, s3, s4, s5, s6, s7].map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 sm:h-80 object-contain rounded-xl"
            />
          </div>
        ))}
      </Carousel>

      {/* Services */}
     {/* Services */}
<section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {isLoading
    ? [1, 2, 3].map((i) => (
        <Skeleton key={i} active paragraph={{ rows: 3 }} />
      ))
    : services.map((service) => (
        <motion.div
          key={service.id}
          onClick={() => navigate(`/${service.to}?user=${user._id}`)}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group cursor-pointer rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-red-600/90 via-black/80 to-gray-900"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-red-500/40 to-transparent blur-2xl"></div>

          {/* Content */}
          <div className="relative p-6 flex flex-col h-full justify-between text-white">
            {/* Icon */}
            <div className="text-4xl mb-4">
              {service.id === 1 && <CarOutlined />}
              {service.id === 2 && <FileTextOutlined />}
              {service.id === 3 && <SafetyCertificateOutlined />}
            </div>

            {/* Title + Description */}
            <div>
              <Title level={4} className="!text-white !mb-1">
                {service.name}
              </Title>
              <Paragraph className="text-gray-200 text-sm">
                {service.description}
              </Paragraph>
            </div>

            {/* Extra Info */}
            <div className="mt-4 flex justify-between text-xs text-gray-300">
              <span>⏱ {service.eta || "2-3 Days"}</span>
              <span>💰 {service.price || "Free"}</span>
              <span>⭐ {service.rating || "4.8/5"}</span>
            </div>

            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Use Now
            </motion.button>
          </div>
        </motion.div>
      ))}
</section>

      {/* Stats Section */}
      {/* <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 p-4">
        {[
     
          { value: "10000+", label: "Happy Customers" },
         
          { value: "24/7", label: "Customer Support" },
          { value: "99%", label: "Customer Satisfaction" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <Title level={3} className="text-red-600">
              {stat.value}
            </Title>
            <Paragraph>{stat.label}</Paragraph>
          </motion.div>
        ))}
      </section> */}








 <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 p-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          initial={{ x: 100, opacity: 0 }} // animate right-to-left
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
        >
          <Card
            bordered={false}
            className="rounded-2xl shadow-lg text-center bg-white"
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-red-600 text-4xl">{stat.icon}</div>
              <Title level={3} className="!text-red-600 m-0">
                {stat.value}
              </Title>
              <Paragraph className="m-0 text-gray-600">
                {stat.label}
              </Paragraph>
            </div>
          </Card>
        </motion.div>
      ))}
    </section>











      {/* Why Choose Us */}
      <section className="mt-10 px-4 text-center">
        <Title level={3} className="text-red-600">
          Why Choose Vahan Solution Mobile App?
        </Title>
        <Paragraph className="max-w-2xl mx-auto text-gray-600">
          Experience the next-gen car service booking with speed, reliability,
          and customer-first approach. Our app makes it easier than ever to
          manage your vehicle needs.
        </Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {[
            {
              title: "Easy to Use",
              desc: "Book your service in just a few clicks.",
              icon: <MobileOutlined />,
              gradient: "from-blue-500 to-indigo-600",
            },
            {
              title: "Trusted Mechanics",
              desc: "Verified experts ensure quality service every time.",
              icon: <UsergroupAddOutlined />,
              gradient: "from-green-500 to-emerald-600",
            },
            {
              title: "Fast & Reliable",
              desc: "Quick response and guaranteed support.",
              icon: <ThunderboltOutlined />,
              gradient: "from-yellow-500 to-orange-600",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className={`bg-gradient-to-r ${item.gradient} text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <Title level={4} className="!text-white">
                {item.title}
              </Title>
              <Paragraph className="text-white text-sm">{item.desc}</Paragraph>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeContent;
