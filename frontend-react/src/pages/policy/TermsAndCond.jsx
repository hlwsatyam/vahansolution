import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
 
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation on component mount
    setIsVisible(true);
  }, []);
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-red-500 text-black shadow-md fixed w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "white" }} />}
          onClick={() => navigate(-1)}
        />
        <p className="m-0 flex-1 text-center text-white">
          Terms & Conditions
        </p>
      </header>







 
 
    <div className="min-h-scree mt-4 bg-gradient-to-br from-blue-50 to-indigo-100 py-8 ">
      <div className={`max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
     
        
        {/* Content Section */}
        <div className="p-6 md:p-8  overflow-y-auto max-h-screen">
          {/* Section 1 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">1</span>
              Agreement to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms and Conditions constitute a legally binding agreement between you ("User") and Vahan Solution ("we," "us," or "our"), governing your use of our website, mobile app, and related services (collectively, the "Service"). By accessing or using the Service, you agree to comply with and be bound by these Terms. If you do not agree, please do not use the Service.
            </p>
          </div>
          
          {/* Section 2 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">2</span>
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content, logos, trademarks, and materials on the Service are the property of Vahan Solution or its licensors and are protected by copyright and intellectual property laws. You agree not to reproduce, distribute, modify, or create derivative works from any content without our explicit permission.
            </p>
          </div>
          
          {/* Section 3 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">3</span>
              User Obligations
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to use the Service responsibly and not engage in illegal activities, abuse, or misuse of the platform. Unauthorized attempts to access other accounts, disrupt services, or exploit security vulnerabilities are prohibited.
            </p>
          </div>
          
          {/* Section 4 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">4</span>
              Account Termination
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to suspend or terminate your access to the Service at our sole discretion, especially for violations of these Terms or abusive behavior.
            </p>
          </div>
          
          {/* Section 5 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">5</span>
              Disclaimers and Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee uninterrupted, error-free, or secure access. We shall not be liable for any direct or indirect damages arising from your use of the Service.
            </p>
          </div>
          
          {/* Section 6 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">6</span>
              Modifications
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may modify, update, or discontinue the Service or these Terms at any time without prior notice. Continued use after changes implies your acceptance of the updated Terms.
            </p>
          </div>
          
          {/* Section 7 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">7</span>
              Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms are governed by the laws of West Bengal, India. Any disputes will be resolved under the jurisdiction of the appropriate courts.
            </p>
          </div>
          
          {/* Section 8 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">8</span>
              Links to Third-Party Sites
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our Service may contain links to third-party websites. We are not responsible for their content, terms, or privacy practices. Use these sites at your own risk.
            </p>
          </div>
          
          {/* Section 9 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">9</span>
              Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Use of your personal information is governed by our <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>.
            </p>
          </div>
          
          {/* Section 10 */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">10</span>
              Contact Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For questions or concerns regarding these Terms, please contact us at:
            </p>
            <div className="mt-4 pl-11">
              <p className="text-gray-600 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: <a href="mailto:Support@vahansolution.in" className="text-blue-600 hover:underline ml-1">Support@vahansolution.in</a>
              </p>
              <p className="text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone: <a href="tel:94777122227" className="text-blue-600 hover:underline ml-1">94777122227</a>
              </p>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
 







    </div>
  );
};

export default TermsAndConditions;
