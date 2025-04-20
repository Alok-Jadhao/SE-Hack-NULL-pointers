"use client"
import SearchBar from "../../components/SearchBar"
import HeroBanner from "../../components/HeroBanner"
import CourseProgressList from "../../components/CourseProgressList"
import ContinueWatching from "../../components/ContinueWatching"
import MentorSection from "../../components/MentorSection"
import CourseTable from "../../components/CourseTable"
import InstructorSidebar from "../../components/InstructorSidebar"
import LiveClassCard from "../../components/LiveClassCard"
import TaskCard from "../../components/TaskCard"
import BatchCard from "../../components/BatchCard"

export default function InstructorDashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <InstructorSidebar /> */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <SearchBar />
        <HeroBanner />
        
        {/* Live Classes Section */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Live Classes</h2>
            <a href="#" className="text-blue-500 text-sm">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <LiveClassCard
              title="How to Make an Array and it's Types in C++"
              batch="Batch 3CO - JVY"
              time="12:40 P:M"
              date="03 Jan 2023"
              status="Ongoing"
              statusColor="bg-[#3A506B]"
              statusTextColor="text-white"
            />
            <LiveClassCard
              title="How to Make an Array and it's Types in C++"
              batch="Batch 3MY - JVY"
              time="01:40 P:M"
              date="03 Jan 2023"
              status="Starting in 60 Minutes"
              statusColor="bg-[#A8C0A0]"
              statusTextColor="text-[#37474F]"
            />
          </div>
        </div>

        {/* My Tasks Section */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Tasks</h2>
            <a href="#" className="text-blue-500 text-sm">
              Open Kan Ban
            </a>
          </div>
          <div className="space-y-4">
            <TaskCard
              title="Add a Quiz for Students of 3CO - JVY on the subject Fundamentals of Programming"
              assignedTime="12:40 P:M"
              assignedDate="03 Jan 2023"
              dueTime="03:40 P:M"
              dueDate="03 Jan 2023"
              status="Not Started"
            />
            <TaskCard
              title="Add a Quiz for Students of 3CO - JVY on the subject Fundamentals of Programming"
              assignedTime="12:40 P:M"
              assignedDate="03 Jan 2023"
              dueTime="03:40 P:M"
              dueDate="03 Jan 2023"
              status="Ongoing"
              statusColor="text-[#3A506B]"
            />
          </div>
        </div>

        {/* My Batches Section */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Batches</h2>
            <a href="#" className="text-blue-500 text-sm">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BatchCard />
            <BatchCard />
            <BatchCard />
            <BatchCard />
          </div>
        </div>
      </div>
    </div>
  )
} 