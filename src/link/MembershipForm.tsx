import React, { useState, useEffect } from "react";
import { 
  User, Mail, Building2, Home, MapPin, Phone, Briefcase, Building, Info, Linkedin, Link, CreditCard, AlertCircle, Check, ChevronDown, Search, Menu, PhoneIcon 
} from "lucide-react";
import axios from 'axios';

// Add these country-state mappings at the top of the file
const countryStateMap = {
  india: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ],
  us: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ],
  uk: [
    "England", "Scotland", "Wales", "Northern Ireland"
  ],
  canada: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
    "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
    "Northwest Territories", "Nunavut", "Yukon"
  ]
};

// Add Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

const MembershipForm: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [membershipFee, setMembershipFee] = useState<string>("-- GBP");
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);
  const [agreeConduct, setAgreeConduct] = useState<boolean>(false);
  const [states, setStates] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    currentPosition: '',
    institute: '',
    department: '',
    organisation: '',
    address: '',
    town: '',
    postcode: '',
    state: '',
    country: '',
    status: '',
    linkedin: '',
    orcid: '',
    researchGate: '',
    membershipFee: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Add useEffect to update states when country changes
  useEffect(() => {
    if (country) {
      setStates(countryStateMap[country as keyof typeof countryStateMap] || []);
    } else {
      setStates([]);
    }
  }, [country]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add form validation
  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setErrorMessage("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setErrorMessage("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Email is required");
      return false;
    }
    if (!formData.organisation.trim()) {
      setErrorMessage("Organisation is required");
      return false;
    }
    if (!formData.town.trim()) {
      setErrorMessage("Town is required");
      return false;
    }
    if (!status) {
      setErrorMessage("Please select your status");
      return false;
    }
    if (!country) {
      setErrorMessage("Please select your country");
      return false;
    }
    return true;
  };

  const initializeRazorpay = async () => {
    if (!validateForm()) {
      return;
    }

    const amount = status === 'student' ? 2000 : 5000; // Amount in paise (20 GBP or 50 GBP)

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'your_razorpay_key_id',
      amount: amount,
      currency: "GBP",
      name: "Design Society",
      description: `${status === 'student' ? 'Student' : 'Professional'} Membership Fee`,
      handler: function (response: any) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.mobile
      },
      theme: {
        color: "#EF4444"
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      setErrorMessage('Unable to initialize payment. Please try again.');
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    try {
      // Verify payment with your backend
      const verifyResponse = await axios.post('https://b-gray-phi.vercel.app/api/verify-payment', {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        membershipDetails: formData
      });

      if (verifyResponse.data.success) {
        alert('Payment successful! Your membership is now active.');
        // Reset form or redirect to success page
      } else {
        setErrorMessage('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setErrorMessage('Error verifying payment. Please contact support.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!agreePrivacy || !agreeConduct) {
      setErrorMessage("Please agree to the terms and conditions");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save membership details
      const response = await axios.post('https://b-gray-phi.vercel.app/api/membership', {
        ...formData,
        status,
        country
      });
      
      // Show success message
      alert(response.data.message);
      
      // Reset form
      setFormData({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        currentPosition: '',
        institute: '',
        department: '',
        organisation: '',
        address: '',
        town: '',
        postcode: '',
        state: '',
        country: '',
        status: '',
        linkedin: '',
        orcid: '',
        researchGate: '',
        membershipFee: ''
      });
      setStatus("");
      setCountry("");
      setAgreePrivacy(false);
      setAgreeConduct(false);
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMessage(
        error.response?.data?.message || 
        'Error processing membership. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-medium text-center text-gray-800 mb-4">
            Membership application form
          </h1>
          <div className="border-b border-gray-300 w-24 mx-auto mb-8"></div>

          {/* Membership Information */}
          <div className="mb-8">
            <p className="mb-4">
              <span className="font-semibold text-red-500">Associate membership</span> is available to students or those having graduated with undergraduate, masters or doctoral degrees within the past two years from time of application. Selecting your status below certifies that you fulfil this requirement.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-red-500">Full membership</span> is available to all others.
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
                    <option value="">Select Country</option>
                    <option value="india">India</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center text-red-600">
                <AlertCircle size={16} className="mr-2" />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <User size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Firstname*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <User size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Lastname*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <User size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                  />
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
                  <input 
                    type="email" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Mobile</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Phone size={16} />
                  </span>
                  <input 
                    type="tel" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Current position</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Briefcase size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="currentPosition"
                    value={formData.currentPosition}
                    onChange={handleInputChange}
                  />
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
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="institute"
                    value={formData.institute}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Department</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Building2 size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Organisation*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Building2 size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleInputChange}
                    required 
                  />
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
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Town*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Building size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="town"
                    value={formData.town}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Postcode</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <MapPin size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pl-10" 
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                  />
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
                  <select 
                    className="w-full border border-gray-300 rounded p-2 pl-10 pr-8 appearance-none bg-white"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={!country}
                  >
                    <option value="">Select State/Province</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
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
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
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
                      name="orcid"
                      value={formData.orcid}
                      onChange={handleInputChange}
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
                      name="researchGate"
                      value={formData.researchGate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-8">
              <h3 className="font-medium mb-4">Select Payment Method</h3>
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {/* Razorpay */}
                  <div 
                    className="border border-gray-200 rounded p-4 cursor-pointer hover:border-red-500"
                    onClick={initializeRazorpay}
                  >
                    <div className="flex flex-col items-center">
                      <img src="/razorpay-icon.png" alt="Razorpay" className="h-8 w-auto mb-2" />
                      <span className="text-sm">Razorpay</span>
                    </div>
                  </div>

                  {/* Net Banking */}
                  <div 
                    className="border border-gray-200 rounded p-4 cursor-pointer hover:border-red-500"
                    onClick={initializeRazorpay}
                  >
                    <div className="flex flex-col items-center">
                      <img src="/netbanking-icon.png" alt="Net Banking" className="h-8 w-auto mb-2" />
                      <span className="text-sm">Net Banking</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-center">
                  Secure payments powered by <span className="font-medium">Razorpay</span>
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
                    Please read and agree to our <a href="#" className="text-red-500 font-medium">Terms of Use</a> and that you have read our <a href="#" className="text-red-500 font-medium">Privacy Policy</a>, including our <a href="#" className="text-red-500 font-medium">Data Protection Policy</a> and <a href="#" className="text-red-500 font-medium">Cookies Policy</a>.
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
                      I have read and agree with the <a href="#" className="text-red-500">updated privacy policy</a> and <a href="#" className="text-red-500">data protection policy</a>.
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
                      I have read and agree to the Design Society's <a href="#" className="text-red-500">Code of Professional Conduct</a>.
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`text-white bg-red-500 font-medium py-2 px-8 rounded 
                    hover:bg-red-700 transition-colors disabled:opacity-50 
                    disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? "Processing..." : "JOIN NOW"}
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