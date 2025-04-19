import CourseProgressCard from "./CourseProgressCard"

export default function CourseProgressList() {
  const courses = [
    { id: 1, title: "Product Design", progress: "2/8" },
    { id: 2, title: "Product Design", progress: "2/8" },
    { id: 3, title: "Product Design", progress: "2/8" },
  ]

  return (
    <div className="px-4 mb-8">
      <div className="flex flex-wrap gap-4">
        {courses.map((course) => (
          <CourseProgressCard key={course.id} title={course.title} progress={course.progress} />
        ))}
      </div>
    </div>
  )
}
