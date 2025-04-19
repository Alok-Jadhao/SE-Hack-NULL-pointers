import { Bell, MoreVertical } from "lucide-react"

export default function CourseProgressCard({ title, progress }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 flex-1 min-w-[250px]">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
        <Bell className="h-5 w-5 text-purple-600" />
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">{progress} Watched</div>
        <div className="font-medium">{title}</div>
      </div>
      <button className="text-gray-400">
        <MoreVertical className="h-5 w-5" />
      </button>
    </div>
  )
}
