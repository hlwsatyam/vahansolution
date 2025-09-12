 



import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeComp";

// Dummy fetch function
const fetchServices = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "RC Details",
          to: "fetchRCDetails",
          description: "Check your vehicle RC details instantly.",
          rating: 4.8,
          eta: "1 min",
          price: "₹8",
          icon: "CarOutlined",
        },
        {
          id: 2,
          name: "RC Details With Challan",
          to: "FetchRCDetailsWithChallan",
          description: "Get vehicle RC details along with pending challans.",
          rating: 4.6,
          eta: "2 mins",
          price: "₹8",
          icon: "FileTextOutlined",
        },
        // {
        //   id: 3,
        //   name: "E-Challan",
        //   to: "Challan",
        //   description: "Fetch traffic challan info with payment options.",
        //   rating: 4.7,
        //   eta: "Instant",
        //   price: "₹29",
        //   icon: "SafetyCertificateOutlined",
        // },
        // {
        //   id: 4,
        //   name: "NETC FASTag",
        //   to: "NETC",
        //   description: "Check Your NETC FASTag Status | NPCI - National Payments Corporation of India",
        //   rating: 4.5,
        //   eta: "Instant",
        //   price: "₹8",
        //   icon: "CarOutlined",
        // },
        {
          id: 5,
          name: "Driving License Verification",
          to: "dl",
          description: "Validate DL of users while onboarding securely.",
          rating: 4.9,
          eta: "2-3 mins",
          price: "₹8",
          icon: "FileTextOutlined",
        },
      ]);
    }, 1000);
  });
};




const Home = ({user}) => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    onError: () => toast.error("Failed to load services"),
  });

 

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />
      <HomeContent user={user}  services={services} isLoading={isLoading} />
      <Footer    active="home"/>
    </div>
  );
};

export default Home;
