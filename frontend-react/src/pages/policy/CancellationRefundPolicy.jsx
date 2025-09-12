import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CancellationRefundPolicy = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation on component mount
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-green-600 text-black shadow-md fixed w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "white" }} />}
          onClick={() => navigate(-1)}
        />
        <p className="m-0 flex-1 text-center text-white">
          Cancellation & Refund Policy
        </p>
      </header>

      <div className="min-h-screen mt-14 bg-gradient-to-br from-green-50 to-teal-100 py-8 px-4">
        <div className={`max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-teal-700 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Cancellation and Refunds Policy</h1>
            <p className="text-green-100">Last Updated: 01/10/2025</p>
          </div>
          
          {/* Content Section */}
          <div className="p-6 md:p-8 overflow-y-auto">
            {/* Cancellations Section */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                Cancellations
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Customers may cancel their orders or service requests up to 24 hours before the scheduled processing or delivery time without any penalty.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                To cancel, please contact our support team via email at <a href="mailto:Support@vahansolution.in" className="text-green-600 hover:underline font-medium">Support@vahansolution.in</a> or call us at <a href="tel:+9194777122227" className="text-green-600 hover:underline font-medium">+9194777122227</a>.
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
                      Cancellations requested less than 24 hours before processing may not be accepted or may incur a cancellation fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Refunds Section */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </span>
                Refunds
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Refunds are available for eligible cancellations and returned products only.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                To qualify for a refund, cancellation requests must be made within the specified cancellation period.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Refund requests should be submitted via our support contact with the original order details.
              </p>
            </div>
            
            {/* Refund Processing Section */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </span>
                Refund Processing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Once your refund request is approved, the refund will be processed within 7-10 business days.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Refunds will be made using the original payment method unless otherwise agreed.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Shipping and handling fees are non-refundable unless the refund is due to our error (e.g., defective product or incorrect order).
              </p>
            </div>
            
            {/* Non-Refundable Items Section */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </span>
                Non-Refundable Items
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Custom or personalized items, digital downloads, and certain services may be non-refundable. These limitations will be indicated on the product page or order confirmation.
              </p>
            </div>
            
            {/* Exchanges and Store Credits Section */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                  </svg>
                </span>
                Exchanges and Store Credits
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                In some cases, we may offer an exchange or store credit instead of a refund at our discretion.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Store credits can be used for future purchases within a month.
              </p>
            </div>
            
            {/* Contact Us Section */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For cancellations, refunds, or questions about this policy, please contact:
              </p>
              <div className="mt-4 pl-11">
                <p className="text-gray-600 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email: <a href="mailto:support@vahansolution.in" className="text-green-600 hover:underline ml-1">support@vahansolution.in</a>
                </p>
                <p className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone: <a href="tel:9477712227" className="text-green-600 hover:underline ml-1">9477712227</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;