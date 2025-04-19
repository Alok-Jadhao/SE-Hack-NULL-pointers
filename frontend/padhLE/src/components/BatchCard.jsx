import React from 'react'

function BatchCard() {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg text-[#5C6B73]">Batch 3CO - JVY</h3>
        <span className="text-sm text-[#5C6B73]">30 Students</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#5C6B73]">Subject:</span>
          <span className="text-sm text-[#5C6B73]">Fundamentals of Programming</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#5C6B73]">Teacher:</span>
          <span className="text-sm text-[#5C6B73]">Devendra Kumar</span>
        </div>
        <div className="bg-[#ECEFF1] p-2 rounded text-center text-sm text-[#5C6B73]">
          Batch Ends at 02 Jan 2027
        </div>
      </div>
    </div>
  )
}

export default BatchCard
