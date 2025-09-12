import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation on component mount
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-blue-600 text-black shadow-md fixed w-full z-50 h-[55px]">
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "white" }} />}
          onClick={() => navigate(-1)}
        />
        <p className="m-0 flex-1 text-center text-white">
          Privacy Policy
        </p>
      </header>

      <div className="  mt-14 bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className={`max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
          
          {/* Content Section */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-screen">
            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">1</span>
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                When you use our services, we may collect personal information including your name, address, email, phone number, and payment details necessary to complete your transactions. We also automatically collect technical data such as your IP address, browser type, and usage information to improve our service.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                Additionally, we may collect information about your device, operating system, and how you interact with our services to enhance user experience and provide better customer support.
              </p>
            </div>
            
            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">2</span>
                Use of Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Your personal information is used to process payments, fulfill orders, communicate with you about your transactions, and improve our services. We do not store your card details; Razorpay securely processes all payment data under PCI-DSS compliance standards.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                We may also use your information to send you important updates about our services, promotional offers (with your consent), and to personalize your experience with our platform.
              </p>
            </div>
            
            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">3</span>
                Consent
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By providing your information and using our service, you consent to the collection and use of your data for the purposes described in this policy. You may withdraw consent at any time by contacting us.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                We will make sure to process your withdrawal request in a timely manner and stop processing your data for the purposes you've withdrawn consent from, unless we have other legal grounds for continued processing.
              </p>
            </div>
            
            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">4</span>
                Disclosure of Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do not sell or rent your personal data. However, we may share information with third-party service providers like Razorpay to facilitate payment processing. These parties have their own privacy policies and comply with relevant data protection regulations.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                In certain circumstances, we may also disclose your information if required by law, to protect our rights, or to prevent fraud or illegal activities. In the event of a business transfer or merger, your information may be transferred to the new entity.
              </p>
            </div>
            
            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">5</span>
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We take reasonable measures to protect your personal data from unauthorized access or disclosure using industry-standard safeguards. However, no online transmission is completely secure.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                Our security measures include encryption of sensitive data, regular security assessments, access controls, and staff training on data protection. While we strive to protect your information, we cannot guarantee absolute security of any information you transmit to us.
              </p>
            </div>
            
            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">6</span>
                Data Retention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                The specific retention period varies depending on the type of data and its purpose. Transaction data is typically retained for 7 years to comply with financial regulations, while other information may be deleted sooner if no longer needed.
              </p>
            </div>
            
            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">7</span>
                Third-Party Links
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our service may contain links to external websites. We are not responsible for the privacy practices or content of these third-party sites.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies solely to information collected by Vahan Solution through our official platforms.
              </p>
            </div>
            
            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">8</span>
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to access, update, or delete your personal information by contacting us at vahansolution.info@gmail.com. You may also have the right to restrict or object to certain processing activities.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                Depending on your jurisdiction, you may have additional rights including data portability and the right to lodge complaints with supervisory authorities. We will respond to all legitimate requests within the timeframe required by applicable law.
              </p>
            </div>
            
            {/* Section 9 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">9</span>
                Children's Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                If you believe that we might have any information from or about a child, please contact us immediately so we can take appropriate action.
              </p>
            </div>
            
            {/* Section 10 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">10</span>
                Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
            
            {/* Section 11 */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">11</span>
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For any questions or concerns about this Privacy Policy or your data, please contact:
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

export default PrivacyPolicy;