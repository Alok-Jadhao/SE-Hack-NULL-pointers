"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, ChevronLeft, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CourseHeader() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/90">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:flex hover:bg-purple-50 hover:text-purple-600 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only md:not-sr-only md:ml-2">Back to Courses</span>
          </Button>
          <motion.h1
            className="text-xl font-semibold truncate bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create New Course
          </motion.h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? "Saving..." : "Save"}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
