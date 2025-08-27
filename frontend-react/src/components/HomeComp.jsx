import React from "react";
import { Carousel, Typography, Skeleton } from "antd";
import { motion } from "framer-motion";
import {
  CarOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { s1, s2, s3, s4, s5, s6, s7 } from "../LOCAL/VARIABLE";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomeContent = ({ services, isLoading }) => {
  const nanvifation = useNavigate();
  return (
    <main className="flex-1 overflow-y-auto mt-[60px] mb-[60px]">
      {/* Carousel */}
      <Carousel autoplay>
        {[s1, s2, s3, s4, s5, s6, s7].map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 sm:h-72 object-contain"
            />
          </div>
        ))}
      </Carousel>

      {/* Services */}
      <section className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isLoading
          ? [1, 2].map((i) => (
              <Skeleton key={i} active paragraph={{ rows: 2 }} />
            ))
          : services.map((service) => (
              <motion.div
                key={service.id}
                onClick={() => nanvifation(`/${service.to}`)}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r cursor-pointer from-black/70 via-white/70 to-red-600/70 text-white rounded-xl shadow-lg p-4 flex items-center space-x-3"
              >
                <div className="text-2xl">
                  {service.id === 1 && <CarOutlined />}
                  {service.id === 2 && <FileTextOutlined />}
                  {service.id === 3 && <SafetyCertificateOutlined />}
                </div>
                <div>
                  <Title level={5} className="text-white m-0">
                    {service.name}
                  </Title>
                  <Paragraph className="text-white/80 m-0">
                    {service.description}
                  </Paragraph>
                </div>
              </motion.div>
            ))}
      </section>

      {/* Stats */}
      <section className="flex justify-around mt-6 p-4 bg-white rounded-lg shadow-md mx-4">
        <div className="text-center">
          <Title level={3} className="text-red-600">
            1450+
          </Title>
          <Paragraph>Cars Serviced</Paragraph>
        </div>
        <div className="text-center">
          <Title level={3} className="text-red-600">
            5000+
          </Title>
          <Paragraph>Expert Mechanics</Paragraph>
        </div>
        <div className="text-center">
          <Title level={3} className="text-red-600">
            10000+
          </Title>
          <Paragraph>Happy Customers</Paragraph>
        </div>
      </section>
    </main>
  );
};

export default HomeContent;
