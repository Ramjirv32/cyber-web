import { Shield, Lock, UserCheck, FileCheck } from 'lucide-react';

export default function PolicyBoard() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Policy Board</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Guiding principles and governance framework for cybersecurity initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-right">
            <h2 className="text-2xl font-bold mb-6">Board Members</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img src="https://source.unsplash.com/100x100/?portrait" alt="Board Member 1" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-bold">Dr. Emily Thompson</h3>
                  <p className="text-gray-600">Chairperson</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <img src="https://source.unsplash.com/101x101/?portrait" alt="Board Member 2" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-bold">Michael Chang</h3>
                  <p className="text-gray-600">Vice Chair</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <img src="https://source.unsplash.com/102x102/?portrait" alt="Board Member 3" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-bold">Dr. Sarah Martinez</h3>
                  <p className="text-gray-600">Secretary</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-left">
            <h2 className="text-2xl font-bold mb-6">Core Responsibilities</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h3 className="font-bold">Policy Development</h3>
                  <p className="text-gray-600">Creating and maintaining cybersecurity policies and standards</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Lock className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h3 className="font-bold">Risk Management</h3>
                  <p className="text-gray-600">Assessing and mitigating security risks</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <UserCheck className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h3 className="font-bold">Compliance Oversight</h3>
                  <p className="text-gray-600">Ensuring adherence to security standards and regulations</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FileCheck className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h3 className="font-bold">Strategic Planning</h3>
                  <p className="text-gray-600">Developing long-term security strategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">Current Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Zero Trust Architecture</h3>
              <p className="text-gray-600">Implementing comprehensive zero trust security framework</p>
              <div className="mt-4 h-2 bg-gray-200 rounded">
                <div className="h-2 bg-red-500 rounded" style={{width: '75%'}}></div>
              </div>
              <p className="mt-2 text-sm text-gray-500">75% Complete</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-3">AI Security Guidelines</h3>
              <p className="text-gray-600">Developing standards for AI-powered security systems</p>
              <div className="mt-4 h-2 bg-gray-200 rounded">
                <div className="h-2 bg-red-500 rounded" style={{width: '60%'}}></div>
              </div>
              <p className="mt-2 text-sm text-gray-500">60% Complete</p>
            </div>
          </div>
        </div>

        <div className="text-center" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">Meeting Schedule</h2>
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">March 15, 2024</td>
                  <td className="px-6 py-4">Q1 Policy Review</td>
                  <td className="px-6 py-4"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Scheduled</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">April 1, 2024</td>
                  <td className="px-6 py-4">Security Framework Update</td>
                  <td className="px-6 py-4"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}