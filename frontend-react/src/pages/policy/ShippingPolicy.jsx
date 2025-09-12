import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingPolicy = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation on component mount
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-purple-600 text-black shadow-md fixed w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "white" }} />}
          onClick={() => navigate(-1)}
        />
        <p className="m-0 flex-1 text-center text-white">
          Shipping Policy
        </p>
      </header>

      <div className="min-h-screen mt-14 bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
        <div className={`max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Shipping Policy</h1>
            <p className="text-purple-100">Vahan Solution - www.vahansolution.co.in</p>
          </div>
          
          {/* Content Section */}
          <div className="p-6 md:p-8 overflow-y-auto">
            {/* Introduction */}
            <div className="mb-8 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-700">
                Our website is provided by: <span className="font-semibold">www.vahansolution.co.in</span>
                <br />
                Contact email: <a href="mailto:Support@vahansolution.in" className="text-blue-600 hover:underline font-medium">Support@vahansolution.in</a>
              </p>
            </div>
            
            {/* Shipment Processing Times */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 极 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </span>
                Shipment Processing Times
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All orders are processed within <span className="font-semibold">1-3 business days</span> (excluding weekends and holidays) after the order is placed. During high-volume periods, processing time may take longer.
              </p>
            </div>
            
            {/* Delivery */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 极 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-6a1 1 0 00-.293-.707l-4-4A1 1 0 0016 4H3z" />
                  </svg>
                </span>
                Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Products are delivered to the address provided by you and as per the order summary. Please check the package upon delivery and report any issues promptly using the contact information provided. If the package is visibly damaged, you may refuse to accept it.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Always inspect your package before accepting delivery. Report any damages within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Delivery Areas:</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We ship to the following Kolkata, West Bengal, India and all states across India.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Delivery Times:</h3>
              <p className="text-gray-600 leading-relaxed">
                Standard shipping typically takes <span className="font-semibold">5-7 business days</span>. Expedited options may be available at checkout. Note delivery times are estimates and may vary due to holidays, weather, or other unforeseen factors.
              </p>
            </div>
            
            {/* Shipping Costs */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 极 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </span>
                Shipping Costs
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Shipping costs are calculated at checkout and depend on the shipping method and destination. We may offer <span className="font-semibold">free shipping on orders over ₹1000</span>.
              </p>
            </div>
            
            {/* Shipment Confirmation & Tracking */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </span>
                Shipment Confirmation & Tracking
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Once your order has shipped, you will receive a confirmation email with a tracking number. You can track your order on the carrier's website.
              </p>
            </div>
            
            {/* Shipping Restrictions */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Shipping Restrictions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do not ship to P.O. boxes or APO/FPO addresses. Some items may have additional shipping restrictions based on size or destination.
              </p>
            </div>
            
            {/* Customs, Duties, and Taxes */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                  </svg>
                </span>
                Customs, Duties, and Taxes
              </h2>
              <p className="text-gray-600 leading-relaxed">
                International shipments may be subject to customs fees, import duties, and taxes levied by the destination country. These charges are the responsibility of the customer and are not included in the shipping cost.
              </p>
            </div>
            
            {/* Failed Delivery */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
                Failed Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We are not liable for delivery errors due to incorrect or incomplete shipping information provided by you. If a package is returned due to failed delivery, we will contact you to arrange reshipping, which may incur additional charges.
              </p>
            </div>
            
            {/* Contact Section */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06极-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17极1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                Contact
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For any shipping inquiries or issues, please contact us at:
              </p>
              <div className="mt-4 pl-11">
                <p className="text-gray-600 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email: <a href="mailto:support@vahansolution.in" className="text-purple-600 hover:underline ml-1">support@vahansolution.in</a>
                </p>
                <p className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone: <a href="tel:9477712227" className="text-purple-600 hover:underline ml-1">9477712227</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;