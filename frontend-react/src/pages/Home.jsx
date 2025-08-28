 



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
        { id: 1, name: "RC Details", to:'fetchRCDetails' ,  description: "Check your vehicle RC details" },
        { id: 1, name: "RC Details With Challan", to:'FetchRCDetailsWithChallan' ,  description: "Check your vehicle RC details With challan" },
        { id: 2, name: "E-Challan", to:'Challan' ,   description: "Fetch traffic challan info" },
        { id: 2, name: "NETC FASTag", to:'NETC' ,   description: "Fetch traffic challan info" },
        { id: 2, name: "Driving License verification", to:'dl' ,   description: "Validate DL of users while onboarding" },
         
      ]);
    }, 1000);
  });
};

const Home = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    onError: () => toast.error("Failed to load services"),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <HomeContent services={services} isLoading={isLoading} />
      <Footer  active="home"/>
    </div>
  );
};

export default Home;
