import MentorItem from "./MentorItem"

export default function MentorList({ limit = 5, showSeeAllButton = false }) {
  const mentors = Array(limit).fill({
    id: 1,
    name: "Prashant Kumar Singh",
    role: "Software Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  })

  return (
    <>
      {mentors.map((mentor, index) => (
        <MentorItem key={index} mentor={mentor} />
      ))}

      {showSeeAllButton && (
        <div className="mt-4 text-center">
          <button className="w-full py-3 bg-purple-100 text-purple-600 rounded-lg font-medium">See All</button>
        </div>
      )}
    </>
  )
}
