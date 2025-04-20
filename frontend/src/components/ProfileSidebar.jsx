import { Bell, Mail, MoreVertical, Plus } from "lucide-react"
import MentorList from "./MentorList"
import ProgressChart from "./ProgressChart"

export default function ProfileSidebar() {
  return (
    <div className="w-80 border-l border-gray-200 bg-white p-6 hidden lg:block">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold">Your Profile</h2>
        <button>
          <MoreVertical className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white ring-2 ring-purple-500">
            <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-0 right-0 w-full h-full">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
              <circle cx="50" cy="50" r="48" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="4" />
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="#A855F7"
                strokeWidth="4"
                strokeDasharray="300"
                strokeDashoffset="75"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-1">Good Morning Prashant</h3>
        <p className="text-sm text-gray-500 text-center mb-4">Continue Your Journey And Achieve Your Target</p>

        <div className="flex gap-3 mb-6">
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
            <Bell className="h-5 w-5 text-gray-500" />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
            <Mail className="h-5 w-5 text-gray-500" />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </button>
        </div>

        {/* Progress Chart */}
        <ProgressChart />

        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Your Mentor</h3>
            <button className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
              <Plus className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <MentorList limit={5} />

          <button className="w-full py-2 bg-purple-100 text-purple-600 rounded-lg font-medium mt-4 text-sm">
            See All
          </button>
        </div>
      </div>
    </div>
  )
}
