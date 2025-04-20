import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SearchBar2() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Update search query from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const search = searchParams.get('search')
    if (search) {
      setSearchQuery(search)
    }
  }, [location.search])

  // Handle live search
  const handleInputChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    // Update URL with search query
    if (query.trim()) {
      navigate(`/student/courses?search=${encodeURIComponent(query)}`, { replace: true })
    } else {
      navigate('/student/courses', { replace: true })
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    navigate('/student/courses', { replace: true })
  }

  return (
    <form className="mb-4 w-full max-w-4xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute flex items-center pl-4 inset-y-0 left-0 flex items-center justify-center w-10">
          <Search className="w-5 h-5 text-gray-400 transition-colors duration-200" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          placeholder="Search courses..."
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}
