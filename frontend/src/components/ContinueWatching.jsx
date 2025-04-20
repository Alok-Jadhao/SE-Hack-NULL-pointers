import { ChevronLeft, ChevronRight } from "lucide-react"
import CourseCard from "./CourseCard"

export default function ContinueWatching() {
  const courses = [
    {
      id: 1,
      image: "/placeholder.svg?height=200&width=400",
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      progress: 25,
      instructor: {
        name: "Prashant Kumar Singh",
        role: "Software Developer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: 2,
      image: "/placeholder.svg?height=200&width=400",
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      progress: 25,
      instructor: {
        name: "Prashant Kumar Singh",
        role: "Software Developer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: 3,
      image: "/placeholder.svg?height=200&width=400",
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      progress: 25,
      instructor: {
        name: "Prashant Kumar Singh",
        role: "Software Developer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
  ]

  return (
    <div className="px-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Continue Watching</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
