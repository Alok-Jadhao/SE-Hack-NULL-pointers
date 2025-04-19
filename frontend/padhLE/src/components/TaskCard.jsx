import React from 'react'
import ClockIcon from './ClockIcon'
import CalendarIcon from './CalendarIcon'

function TaskCard({ title, assignedTime, assignedDate, dueTime, dueDate, status, statusColor = 'text-[#5C6B73]' }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="font-medium text-lg mb-2 text-[#5C6B73]">{title}</h3>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <ClockIcon />
          <span className="text-sm text-[#5C6B73]">{assignedTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <span className="text-sm text-[#5C6B73]">{assignedDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <ClockIcon />
          <span className="text-sm text-[#5C6B73]">{dueTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <span className="text-sm text-[#5C6B73]">{dueDate}</span>
        </div>
      </div>

      <div className={`text-sm ${statusColor}`}>Status: {status}</div>
    </div>
  )
}

export default TaskCard 