"use client"
import SearchBar from "../components/SearchBar"
import HeroBanner from "../components/HeroBanner"
import CourseProgressList from "../components/CourseProgressList"
import ContinueWatching from "../components/ContinueWatching"
import MentorSection from "../components/MentorSection"
import CourseTable from "../components/CourseTable"
import ProfileSidebar from "../components/ProfileSidebar"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <SearchBar />
        <HeroBanner />
        <CourseProgressList />
        <ContinueWatching />
        <MentorSection />
        <CourseTable />
      </div>

      {/* Sidebar */}
      <ProfileSidebar />
    </div>
  )
}
