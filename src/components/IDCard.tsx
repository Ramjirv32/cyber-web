"use client"

import { UserIcon } from "lucide-react"
import lo from "../components/images/lo.png"
import { QRCodeSVG } from "qrcode.react"
import gold from "./images/card1.png"

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
  const cardUrl = `${window.location.origin}/id-card/${idNumber}`

  return (
    <div
      className="relative w-[600px] h-[380px] rounded-xl overflow-hidden shadow-2xl border"
      style={{
        backgroundImage: `url(${gold})`, // Fixed: Properly format the background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex h-full">
        <div className="w-full flex flex-col items-center justify-center">
          <img src={lo || "/placeholder.svg"} alt="Logo" className="w-74 h-64 object-contain ml-[-30px]" />

          <p className="text-3xl font-semibold text-black">VALID UNTIL {expiryDate}</p>

          <div className="mt-4 text-center"></div>
        </div>

        <div className="w-1/2 flex flex-col justify-between p-2">
          <div className="w-full flex justify-center">
            <div
              className={`w-32 h-32 rounded-md overflow-hidden flex items-center justify-center mt-[50px] ml-[-230px] ${photoUrl ? "" : "bg-gray-300"}`}
              style={
                photoUrl
                  ? {
                      backgroundImage: `url(${photoUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              {!photoUrl && <UserIcon className="w-16 h-16\ text-gray-600 border-lg" />}
            </div>
          </div>

          <div className="text-center mt-2 ml-[-230px]">
            <h2 className="text-xl font-bold text-black">{title ? `${title} ${name}` : name}</h2>
            <p className="text-lg font-medium text-black">{currentPosition}</p>
            <p className="text-xl font-semibold text-black">ID: {idNumber}</p>
          </div>

          <div className="mx-auto w-70 h-20 ml-[80px]">
            <QRCodeSVG
              value={cardUrl}
              size={80}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
              className="mx-auto mt-[-60px]"
            />
            <p className="text-xs text-center text-gray-500">Scan for verification</p>
          </div>
        </div>
      </div>
    </div>
  )
}
