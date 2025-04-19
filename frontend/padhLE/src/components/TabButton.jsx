import React from 'react'

function TabButton({ label, active = false }) {
    return (
      <button
        className={`px-4 py-2 text-sm rounded-md ${
          active ? "bg-[#7BAEA3] text-white font-medium" : "text-[#5C6B73] hover:bg-[#F6E7C1]"
        }`}
      >
        {label}
      </button>
    )
  }

export default TabButton