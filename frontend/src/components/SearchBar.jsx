import { Search, Settings } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="p-4 flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search your course here...."
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button className="p-2 rounded-full bg-white border border-gray-200">
        <Settings className="h-6 w-6 text-gray-500" />
      </button>
    </div>
  )
}
