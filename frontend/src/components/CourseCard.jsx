import { Plus } from "lucide-react"

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
      <div className="relative">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-40 object-cover" />
        <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
          <Plus className="h-4 w-4 text-white" />
        </div>
        <div className="absolute bottom-2 left-2 bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">FRONTEND</div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-3">{course.title}</h3>
        <div className="h-1 bg-gray-200 rounded-full mb-3">
          <div className="h-1 bg-purple-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={course.instructor.avatar || "/placeholder.svg"}
            alt={course.instructor.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="text-xs font-medium">{course.instructor.name}</div>
            <div className="text-xs text-gray-500">{course.instructor.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
