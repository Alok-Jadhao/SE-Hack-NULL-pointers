import ClockIcon from "./ClockIcon"
import CalendarIcon from "./CalendarIcon"

export default function LiveClassCard({ title, batch, time, date, status, statusColor, statusTextColor }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h3 className="font-medium text-lg mb-2 text-[#5C6B73]">{title}</h3>
      <div className="text-sm text-[#5C6B73] mb-3">{batch}</div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <ClockIcon />
          <span className="text-sm text-[#5C6B73]">{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <span className="text-sm text-[#5C6B73]">{date}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className={`px-3 py-1 rounded-full text-sm ${statusColor} ${statusTextColor}`}>Status : {status}</div>
        <button className="bg-[#7BAEA3] text-white px-4 py-2 rounded-md text-sm hover:bg-[#7BAEA3]/90">Join Now</button>
      </div>
    </div>
  )
} 