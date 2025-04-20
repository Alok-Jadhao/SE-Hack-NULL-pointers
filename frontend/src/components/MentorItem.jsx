export default function MentorItem({ mentor }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <img
          src={mentor.avatar || "/placeholder.svg"}
          alt={mentor.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-medium">{mentor.name}</div>
          <div className="text-xs text-gray-500">{mentor.role}</div>
        </div>
      </div>
      <button className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Follow</button>
    </div>
  )
}
