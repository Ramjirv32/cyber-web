import React, { useState } from "react";
import { 
  User, Mail, Building2, Home, MapPin, Phone, Briefcase, Building, Info, Linkedin, Link, CreditCard, AlertCircle, Check, ChevronDown, Search, Menu, PhoneIcon 
} from "lucide-react";

const MembershipForm: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [membershipFee, setMembershipFee] = useState<string>("-- GBP");
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);
  const [agreeConduct, setAgreeConduct] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-medium text-center text-gray-800 mb-4">
            Membership application form
          </h1>
          <div className="border-b border-gray-300 w-24 mx-auto mb-8"></div>

          {/* Membership Information */}
          <div className="mb-8">
            <p className="mb-4">
              <span className="font-semibold text-blue-800">Associate membership</span> is available to students or those having graduated with undergraduate, masters or doctoral degrees within the past two years from time of application. Selecting your status below certifies that you fulfil this requirement.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-blue-800">Full membership</span> is available to all others.
            </p>
          </div>

          {/* Membership Fee */}
          <div className="bg-gray-50 p-4 border border-gray-200 mb-8 flex justify-between items-center">
            <div className="text-green-700 font-medium">
              Your membership fee is: {membershipFee}
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-2/3">
              <div>
                <label className="block text-sm mb-1">Status*</label>
                <div className="relative">
                  <select 
                    className="w-full border border-gray-300 rounded p-2 pr-8 appearance-none bg-white"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">--</option>
                    <option value="student">Student</option>
                    <option value="professional">Professional</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Country*</label>
                <div className="relative">
                  <select 
                    className="w-full border border-gray-300 rounded p-2 pr-8 appearance-none bg-white"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">--</option>
                    <option value="uk">United Kingdom</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    {/* More countries would be added here */}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <User size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Firstname*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <User size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" required />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Lastname*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <User size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" required />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">Email*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Mail size={16} />
                  </span>
                  <input type="email" className="w-full border border-gray-300 rounded p-2 pl-10" required />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Mobile</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Phone size={16} />
                  </span>
                  <input type="tel" className="w-full border border-gray-300 rounded p-2 pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Current position</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Briefcase size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">Institute</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Building size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Department</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Building2 size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Organisation*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Building2 size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" required />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Home size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Town*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Building size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" required />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Postcode</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <MapPin size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <label className="block text-sm mb-1">State/Province</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <MapPin size={16} />
                  </span>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 pl-10" />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8">
              <h3 className="font-medium mb-2">Additional information (optional)</h3>
              <p className="text-sm text-gray-600 mb-4">
                This information will help you to configure your own personal research profile page by showing your professional 
                credentials to other members! If you prefer, you can come back later and enter this.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm mb-1">LinkedIn</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Linkedin size={16} />
                    </span>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded p-2 pl-10" 
                      placeholder="https://www.linkedin.com/in/username/"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">ORCID</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Info size={16} />
                    </span>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded p-2 pl-10" 
                      placeholder="https://orcid.org/0000-0000-0000-000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">ResearchGate</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Link size={16} />
                    </span>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded p-2 pl-10" 
                      placeholder="https://www.researchgate.net/"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-8">
              <h3 className="font-medium mb-4">Secure Payment by WorldPay</h3>
              <div className="flex justify-center mb-6">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_8-3-2025_184953_www.designsociety.org-Dv5daGDKTqEnyF1G7hHL1B3reETC0F.jpeg" 
                  alt="WorldPay Payment Options" 
                  className="h-16 w-auto hidden"
                />
                <div className="flex space-x-4 items-center">
                  <CreditCard size={24} className="text-gray-500" />
                  <div className="text-xl font-semibold text-gray-500">worldpay</div>
                  <div className="flex space-x-2">
                    <div className="w-12 h-8 bg-red-500 rounded"></div>
                    <div className="w-12 h-8 bg-blue-500 rounded"></div>
                    <div className="w-12 h-8 bg-blue-800 rounded"></div>
                    <div className="w-12 h-8 bg-blue-600 rounded"></div>
                    <div className="w-12 h-8 bg-green-600 rounded"></div>
                    <div className="w-12 h-8 bg-yellow-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulations */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <AlertCircle size={18} className="text-green-600" />
                </div>
                <div className="ml-3 text-sm">
                  <p className="font-medium text-gray-700">Regulations regarding membership</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <AlertCircle size={18} className="text-green-600" />
                </div>
                <div className="ml-3 text-sm">
                  <p className="text-gray-700">
                    We recommend paying for membership through the web-based process. For alternative payment methods please contact the Design Society office directly on admin (at) designsociety (dot) org. If you require an individual invoice/receipt, please write to admin (at) designsociety (dot) org.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <AlertCircle size={18} className="text-green-600" />
                </div>
                <div className="ml-3 text-sm">
                  <p className="text-gray-700">
                    Please read and agree to our <a href="#" className="text-blue-800 font-medium">Terms of Use</a> and that you have read our <a href="#" className="text-blue-800 font-medium">Privacy Policy</a>, including our <a href="#" className="text-blue-800 font-medium">Data Protection Policy</a> and <a href="#" className="text-blue-800 font-medium">Cookies Policy</a>.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <Mail size={18} className="text-green-600" />
                </div>
                <div className="ml-3 text-sm">
                  <p className="text-green-700 font-medium">
                    After registration we will email you, notifying you of your username and password.
                  </p>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 rounded"
                      checked={agreePrivacy}
                      onChange={() => setAgreePrivacy(!agreePrivacy)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="text-gray-700">
                      I have read and agree with the <a href="#" className="text-blue-800">updated privacy policy</a> and <a href="#" className="text-blue-800">data protection policy</a>.
                    </label>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="conduct"
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 rounded"
                      checked={agreeConduct}
                      onChange={() => setAgreeConduct(!agreeConduct)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="conduct" className="text-gray-700">
                      I have read and agree to the Design Society's <a href="#" className="text-blue-800">Code of Professional Conduct</a>.
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className=" text-white bg-red-500 font-medium py-2 px-8 rounded hover:bg-red-700 transition-colors"
                >
                  JOIN NOW
                </button>
              </div>

              <p className="text-sm text-gray-600 text-center mt-4">
                For any other queries please contact admin (at) designsociety (dot) org.
              </p>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
};

export default MembershipForm;