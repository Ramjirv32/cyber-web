import { UserIcon } from "lucide-react"
import lo from "../components/images/lo.png"
import qr from "../components/images/qr.png"

interface IDCardProps {
  name: string
  title: string
  idNumber: string
  issueDate?: string
  expiryDate?: string
  department?: string
  photoUrl?: string
  currentPosition?: string
}

export default function IDCard({
  name = "John Doe",
  title = "Dr",
  idNumber = "12345",
  issueDate = "01/01/2025",
  expiryDate = "01/01/2027",
  department = "CYBER OPERATIONS",
  photoUrl,
  currentPosition = "Member",
}: IDCardProps) {
  return (
    <div className="relative w-[600px] h-[340px] rounded-xl overflow-hidden shadow-2xl border ">

<div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-amber-600 to-amber-500"></div>
<div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-amber-600 to-amber-500"></div>

      <div className="flex h-full">
        {/* Left Logo Section */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img src={lo} alt="Logo" className="w-54 h-44 object-contain mt-[-10px]" />
          <p className="text-center text-sm font-semibold text-gray-800 mt-2">PUDUCHERRY, INDIA</p>

          <div className="mt-4 text-center">
          
            <p className="text-2xl font-semibold text-black  ">
              VALID UNTIL <br></br>{expiryDate}
            </p>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="w-1/2 flex flex-col justify-between p-2">
          {/* Photo */}
          <div className="w-full flex justify-center">
            <div 
              className={`w-28 h-32 rounded-md overflow-hidden flex items-center justify-center mt-2 ${photoUrl ? '' : 'bg-gray-300'}`} 
              style={photoUrl ? {
                backgroundImage: `url(${photoUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {!photoUrl && <UserIcon className="w-16 h-16 text-gray-600" />}
            </div>
          </div>

          {/* Name & Details */}
          <div className="text-center mt-2">
            <h2 className="text-xl font-bold text-black">{title ? `${title} ${name}` : name}</h2>
            <p className="text-lg font-medium text-black ">{currentPosition}</p>
            <p className="text-xl font-semibold text-black ">ID: {idNumber}</p>
          </div>


          <div className="mx-auto w-70 h-20">
              <img src={qr} alt="QR Code" className="w-full h-full object-contain mt-[-10px]" />
            </div>
          {/* QR + Validity */}
          
        </div>
      </div>
    </div>
  )
}
