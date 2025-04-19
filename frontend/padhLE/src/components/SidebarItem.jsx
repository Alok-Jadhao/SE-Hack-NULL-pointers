import React from 'react'

const SidebarItem = ({ icon, label, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
        active
          ? 'bg-[#3A506B] text-white'
          : 'text-[#37474F] hover:bg-[#EDE7DC]'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  )
}

export default SidebarItem