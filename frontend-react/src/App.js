import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SplashScreen from "./pages/SplashScreen";
import "antd/dist/reset.css";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import toast, { Toaster } from "react-hot-toast";
import { StatusBar, Style } from "@capacitor/status-bar";
import RCFetch from "./pages/RCFetch";
import FetchRCDetailsWithChallan from "./pages/FetchRCDetailsWithChallan";
import Challan from "./pages/Challan";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPass";
import NETC from "./pages/NETC";
import DrivingLicense from "./pages/DrivingLicense";
import TermsAndConditions from "./pages/policy/TermsAndCond";
import ContactPage from "./pages/Contact";
import ShippingPolicy from "./pages/policy/ShippingPolicy";
import PrivacyPolicy from "./pages/policy/Privacy";
import CancellationRefundPolicy from "./pages/policy/CancellationRefundPolicy";
import Wallet from "./pages/Wallet";
import IncToken from "./pages/IncToken";
import ViewRCONLY from "./pages/ViewRCONLY";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setBackgroundColor({ color: "#000000" }); // black background
      StatusBar.setStyle({ style: Style.Light }); // white icons
      StatusBar.show(); // make sure it's visible
    }
  }, []);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const backListener = CapacitorApp.addListener(
        "backButton",
        ({ canGoBack }) => {
          if (location.pathname === "/home" || location.pathname === "/login") {
            if (window.confirm("Are you sure you want to exit?")) {
              CapacitorApp.exitApp();
            }
          } else if (canGoBack) {
            navigate(-1);
          } else {
            CapacitorApp.exitApp();
          }
        }
      );

      return () => {
        backListener.remove();
      };
    }
  }, [location.pathname, navigate]);











const fetchMe = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/user/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch profile");
  }
  return res.json();
};


  const { data,refetch, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (e) => toast.error(e.message),
  });

  const user = data?.user; // ✅ ensure we only pass user object

  // --- Optional: show loader while checking user ---
  if (isLoading && localStorage.getItem("token")) {
    return <SplashScreen/>
  }


  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fetchRCDetails" element={<RCFetch refetch={refetch} />} />
        <Route
          path="/FetchRCDetailsWithChallan"
          element={<FetchRCDetailsWithChallan />}
        />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/NETC" element={<NETC />} />
        <Route path="/dl"   element={<DrivingLicense   refetch={refetch}/>} />
        <Route path="/Challan" element={<Challan />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home    user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet  user={user}  />
            </ProtectedRoute>
          }
        />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/IncToken" element={<IncToken />} />
        <Route path="/viewRC" element={<ViewRCONLY />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cancle" element={<CancellationRefundPolicy />} />
        <Route
          path="/"
          element={
            <Navigate to={localStorage.getItem("token") ? "/home" : "/login"} />
          }
        />
      </Routes>
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hideSplash = async () => {
      setTimeout(async () => {
        setLoading(false);
        if (Capacitor.isNativePlatform()) {
          const { SplashScreen } = await import("@capacitor/splash-screen");
          SplashScreen.hide();
        }
      }, 2000);
    };
    hideSplash();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppWrapper />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
