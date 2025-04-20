"use client"

import { motion } from "framer-motion"
import { Info, BookOpen, GitMerge, Settings, Eye, CheckCircle2 } from "lucide-react"

export default function CourseSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "info", label: "Basic Info", icon: Info, completed: true },
    { id: "modules", label: "Modules & Content", icon: BookOpen, completed: false },
    { id: "prerequisites", label: "Prerequisites", icon: GitMerge, completed: false },
    { id: "settings", label: "Settings", icon: Settings, completed: false },
    { id: "preview", label: "Preview", icon: Eye, completed: false },
  ]

  return (
    <aside className="w-full md:w-72 bg-white border-r border-gray-200 md:h-[calc(100vh-4rem)] overflow-y-auto shadow-md">
      <nav className="p-4">
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 font-medium shadow-sm"
                    : "hover:bg-gray-50"
                }`}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={activeTab === tab.id ? "text-purple-600" : "text-gray-500"}
                >
                  {tab.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <tab.icon className="h-5 w-5" />
                  )}
                </motion.div>
                <span className={activeTab === tab.id ? "font-medium" : ""}>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500 absolute right-0 rounded-l-md"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
