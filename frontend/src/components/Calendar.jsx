import { Calendar as CalendarIcon, Clock, BookOpen, ClipboardList } from "lucide-react"
import { useState } from "react"

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Example upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      type: "assignment",
      title: "React Components Assignment",
      dueDate: "2024-03-15",
      dueTime: "23:59",
      course: "Frontend Development",
      icon: <ClipboardList size={16} />
    },
    {
      id: 2,
      type: "quiz",
      title: "JavaScript Fundamentals Quiz",
      dueDate: "2024-03-18",
      dueTime: "14:00",
      course: "Programming Basics",
      icon: <BookOpen size={16} />
    },
    {
      id: 3,
      type: "assignment",
      title: "Database Design Project",
      dueDate: "2024-03-20",
      dueTime: "23:59",
      course: "Database Management",
      icon: <ClipboardList size={16} />
    }
  ]

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon size={20} className="text-purple-600" />
        <h3 className="font-semibold text-sm">Upcoming Deadlines</h3>
      </div>
      
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-purple-100 rounded-full text-purple-600">
                {event.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{event.title}</div>
                <div className="text-xs text-gray-500">{event.course}</div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{event.dueDate} at {event.dueTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 