import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SplashScreen from './pages/SplashScreen';
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Toaster } from 'react-hot-toast';
import { StatusBar, Style } from '@capacitor/status-bar';
import RCFetch from './pages/RCFetch';
import FetchRCDetailsWithChallan from './pages/FetchRCDetailsWithChallan';
import Challan from './pages/Challan';
import Profile from './pages/Profile';
 
const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();


useEffect(() => {
  if (Capacitor.isNativePlatform()) {
    StatusBar.setBackgroundColor({ color: '#000000' }); // black background
    StatusBar.setStyle({ style: Style.Light }); // white icons
    StatusBar.show(); // make sure it's visible
  }
}, []);


  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const backListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (location.pathname === '/home' || location.pathname === '/login') {
          if (window.confirm('Are you sure you want to exit?')) {
            CapacitorApp.exitApp();
          }
        } else if (canGoBack) {
          navigate(-1);
        } else {
          CapacitorApp.exitApp();
        }
      });

      return () => {
        backListener.remove();
      };
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fetchRCDetails" element={<RCFetch />} />
        <Route path="/FetchRCDetailsWithChallan" element={<FetchRCDetailsWithChallan />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Challan" element={<Challan />} />
        <Route path="/home" element={
          
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
        <Route path="/" element={<Navigate to={localStorage.getItem('token') ? '/home' : '/login'} />} />
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
          const { SplashScreen } = await import('@capacitor/splash-screen');
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
