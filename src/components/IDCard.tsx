import { UserIcon } from "lucide-react"

interface IDCardProps {
  name: string
  position: string
  idNumber: string
  issueDate?: string
  expiryDate?: string
  department?: string
  photoUrl?: string
  logoUrl?: string
}

export default function IDCard({
  name = "John Doe",
  position = "Software Engineer",
  idNumber = "12345",
  issueDate = "01/01/2025",
  expiryDate = "01/01/2027",
  department = "CYBER OPERATIONS",
  photoUrl,
  logoUrl,
}: IDCardProps) {
  // Generate a random barcode pattern
  const generateBarcode = () => {
    const bars = []
    for (let i = 0; i < 50; i++) {
      const width = Math.random() > 0.7 ? 3 : 1
      bars.push(<div key={i} className="h-full bg-black" style={{ width: `${width}px`, marginRight: "1px" }}></div>)
    }
    return bars
  }

  return (
    <div className="relative w-[500px] h-[320px] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
      {/* Security pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500 text-[8px] font-mono opacity-80"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            SCIS
          </div>
        ))}
      </div>

      {/* Red header */}
      <div className="h-20 bg-red-500 flex items-center px-6 justify-between shadow-lg">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-20"></div>
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center">
              <div className="text-red-500 font-bold text-xl">Logo</div>
            </div>
          </div>

          {/* Organization name */}
          <div>
            <h1 className="text-white font-bold text-xl tracking-wider">SOCIETY FOR</h1>
            <p className="text-white text-sm tracking-wider">CYBER INTELLIGENCE SYSTEMS</p>
          </div>
        </div>

        {/* Enhanced hologram effect */}
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-white/90 to-white/20 border border-white/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-red-500 text-[10px] font-bold">VERIFIED</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex p-6 h-[calc(100%-80px)]">
        {/* Left column - Photo */}
        <div className="w-1/3 flex flex-col items-center">
          {/* Photo container */}
          <div className="w-28 h-36 bg-white border-2 border-red-500 overflow-hidden rounded-lg shadow-lg flex items-center justify-center">
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt={`${name}'s profile`}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="text-gray-500 text-center">Profile</div>
            )}
          </div>

          {/* Barcode section */}
          <div className="mt-4 w-full">
            <div className="h-14 w-full flex items-end justify-center bg-gray-50 rounded-md p-2">
              <div className="h-10 flex items-stretch">{generateBarcode()}</div>
            </div>
            <div className="text-[14px] text-center font-mono font-bold mt-2 text-red-600 px-1 w-full bg-gray-100 py-2 rounded">
              {idNumber}
            </div>
          </div>
        </div>

        {/* Right column - Details */}
        <div className="w-2/3 pl-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-wide">{name}</h2>
            <p className="text-sm font-semibold text-red-500 tracking-wide">{position}</p>
            <p className="text-xs text-gray-600 mt-1 font-bold">{department}</p>

            <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2 text-xs bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">ID NUMBER</span>
                <span className="text-gray-900 font-mono font-bold text-sm">{idNumber}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">CLEARANCE</span>
                <span className="text-gray-900 font-mono font-bold text-sm">LEVEL 3</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">ISSUE DATE</span>
                <span className="text-gray-900 font-mono font-bold text-sm">{issueDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">EXPIRY DATE</span>
                <span className="text-gray-900 font-mono font-bold text-sm">{expiryDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}