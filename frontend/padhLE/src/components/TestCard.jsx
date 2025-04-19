import React from 'react'

function TaskCard({ title, assignedTime, assignedDate, dueTime, dueDate, status, statusColor = "text-[#6a6a6a]" }) {
    return (
      <div className="bg-white rounded-lg p-4">
        <h3 className="font-medium mb-4">{title}</h3>
  
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-[#6a6a6a] mb-1">Assigned</div>
            <div className="flex items-center gap-2 mb-1">
              <ClockIcon />
              <span className="text-sm">{assignedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span className="text-sm">{assignedDate}</span>
            </div>
          </div>
  
          <div>
            <div className="text-sm text-[#6a6a6a] mb-1">Due</div>
            <div className="flex items-center gap-2 mb-1">
              <ClockIcon />
              <span className="text-sm">{dueTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span className="text-sm">{dueDate}</span>
            </div>
          </div>
        </div>
  
        <div className="flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>{status}</div>
          <button className="bg-[#2c62ee] text-white px-4 py-2 rounded-md text-sm">View Details</button>
        </div>
      </div>
    )
  }

export default TaskCard;