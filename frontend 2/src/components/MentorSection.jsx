import MentorList from "./MentorList"

export default function MentorSection() {
  return (
    <div className="px-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Mentor</h2>
        <a href="#" className="text-blue-500 text-sm">
          See All
        </a>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <MentorList limit={5} showSeeAllButton={true} />
      </div>
    </div>
  )
}
