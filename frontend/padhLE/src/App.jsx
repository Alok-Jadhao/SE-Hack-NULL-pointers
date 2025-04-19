import { useState } from 'react'
import { Home, Calendar, HelpCircle, LogOut, Bell, ChevronDown } from 'lucide-react'
import SidebarItem from './components/SidebarItem'
import WifiIcon from './components/WifiIcon'
import QuizIcon from './components/QuizIcon'
import ExamIcon from './components/ExamIcon'
import AssignmentIcon from './components/AssignmentIcon'
import BatchesIcon from './components/BatchesIcon'
import LiveClassCard from './components/LiveClassCard'
import TabButton from './components/TabButton'
import TaskCard from './components/TaskCard'
import BatchCard from './components/BatchCard'
import './App.css'

function App() {
  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <div className="w-60 border-r border-[#EDE7DC] bg-white flex flex-col">
        <div className="p-4 border-b border-[#EDE7DC]">
          <div className="flex items-center gap-2 font-bold text-xl text-[#3A506B]">
            <span>TIPS-G</span>
          </div>
        </div>

        <nav className="flex-1 py-4">
          <SidebarItem icon={<Home size={20} />} label="Dashboard" active />
          <SidebarItem icon={<WifiIcon size={20} />} label="Live Classes" />
          <SidebarItem icon={<Calendar size={20} />} label="Schedule" />
          <SidebarItem icon={<QuizIcon size={20} />} label="Quizzes" />
          <SidebarItem icon={<ExamIcon size={20} />} label="Exams" />
          <SidebarItem icon={<AssignmentIcon size={20} />} label="Assignments" />
          <SidebarItem icon={<BatchesIcon size={20} />} label="Batches" />
          <SidebarItem icon={<HelpCircle size={20} />} label="Doubts" />
        </nav>

        <div className="p-4 mt-auto">
          <button className="flex items-center gap-2 text-[#37474F] font-medium">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#3A506B] text-white p-4 flex items-center justify-between">
          <h1 className="text-2xl font-medium">Hii, Devendra</h1>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#A8C0A0] rounded-full"></span>
            </button>
            <button className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#3A506B]">
                <span className="font-bold">D</span>
              </div>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Live Classes Section - Horizontal */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-[#37474F]">Live Classes</h2>
              <a href="#" className="text-[#3A506B] text-sm flex items-center gap-1">
                View All <span className="text-xs">↗</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <LiveClassCard
                title="How to Make an Array and it's Types in C++"
                batch="Batch 3MY - JVY"
                time="01:40 P:M"
                date="03 Jan 2023"
                status="Not Started"
                statusColor="bg-[#EDE7DC]"
                statusTextColor="text-[#37474F]"
              />
            </div>
          </div>

          {/* My Tasks Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-[#37474F]">My Tasks</h2>
              <a href="#" className="text-[#3A506B] text-sm flex items-center gap-1">
                Open Kan Ban <span className="text-xs">↗</span>
              </a>
            </div>

            <div className="bg-white rounded-lg p-4 border border-[#EDE7DC]">
              <div className="flex gap-4 mb-4">
                <TabButton label="All" active />
                <TabButton label="Not Started" />
                <TabButton label="Ongoing" />
                <TabButton label="Completed" />
                <TabButton label="Missed" />
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

                <TaskCard
                  title="Add a Quiz for Students of 3CO - JVY on the subject Fundamentals of Programming"
                  assignedTime="12:40 P:M"
                  assignedDate="03 Jan 2023"
                  dueTime="03:40 P:M"
                  dueDate="03 Jan 2023"
                  status="Completed"
                  statusColor="text-[#A8C0A0]"
                />
              </div>
            </div>
          </div>

          {/* My Batches Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-[#37474F]">My Batches</h2>
              <a href="#" className="text-[#3A506B] text-sm flex items-center gap-1">
                View All <span className="text-xs">↗</span>
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
    </div>
  )
}

export default App
