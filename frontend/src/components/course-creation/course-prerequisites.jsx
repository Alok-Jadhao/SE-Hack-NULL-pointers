"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for available courses
const availableCourses = [
  { id: "course-1", title: "Introduction to Web Development" },
  { id: "course-2", title: "HTML & CSS Fundamentals" },
  { id: "course-3", title: "JavaScript Basics" },
  { id: "course-4", title: "React Fundamentals" },
  { id: "course-5", title: "Node.js for Beginners" },
  { id: "course-6", title: "Database Design" },
  { id: "course-7", title: "UI/UX Design Principles" },
  { id: "course-8", title: "Git & GitHub" },
]

export default function CoursePrerequisites({ course, onUpdate }) {
  const [prerequisites, setPrerequisites] = useState(course.prerequisites || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [prerequisiteType, setPrerequisiteType] = useState("required")

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !prerequisites.some((prereq) => prereq.courseId === course.id),
  )

  const handleAddPrerequisite = () => {
    if (!selectedCourse) return

    const courseToAdd = availableCourses.find((course) => course.id === selectedCourse)
    if (!courseToAdd) return

    const newPrerequisite = {
      id: `prereq-${Date.now()}`,
      courseId: courseToAdd.id,
      courseTitle: courseToAdd.title,
      type: prerequisiteType,
    }

    const updatedPrerequisites = [...prerequisites, newPrerequisite]
    setPrerequisites(updatedPrerequisites)
    onUpdate({ prerequisites: updatedPrerequisites })

    // Reset selection
    setSelectedCourse(null)
    setSearchTerm("")
  }

  const handleRemovePrerequisite = (prerequisiteId) => {
    const updatedPrerequisites = prerequisites.filter((prerequisite) => prerequisite.id !== prerequisiteId)
    setPrerequisites(updatedPrerequisites)
    onUpdate({ prerequisites: updatedPrerequisites })
  }

  const handleChangePrerequisiteType = (prerequisiteId, type) => {
    const updatedPrerequisites = prerequisites.map((prerequisite) => {
      if (prerequisite.id === prerequisiteId) {
        return { ...prerequisite, type }
      }
      return prerequisite
    })
    setPrerequisites(updatedPrerequisites)
    onUpdate({ prerequisites: updatedPrerequisites })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-3 text-purple-800">Course Prerequisites</h2>
        <p className="text-indigo-600 mb-0">
          Define what students should know before taking this course. This helps set expectations and ensures students
          are prepared.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="border-purple-100 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="bg-gradient-to-r from-white to-purple-50">
              <CardTitle className="text-purple-800">Add Prerequisites</CardTitle>
              <CardDescription className="text-indigo-500">
                Search for courses that should be completed before this one
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-400" />
                <Input
                  placeholder="Search courses..."
                  className="pl-8 border-purple-200 focus:border-purple-400 focus:ring-purple-300 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="border border-purple-100 rounded-md max-h-64 overflow-y-auto shadow-sm">
                {filteredCourses.length > 0 ? (
                  <ul className="divide-y divide-purple-100">
                    {filteredCourses.map((course) => (
                      <li key={course.id} className="p-2 hover:bg-purple-50 transition-all">
                        <button
                          className={`w-full text-left px-2 py-1 rounded ${
                            selectedCourse === course.id ? "bg-purple-100 text-purple-800" : ""
                          }`}
                          onClick={() => setSelectedCourse(course.id)}
                        >
                          {course.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-purple-500">No matching courses found</div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Select value={prerequisiteType} onValueChange={(value) => setPrerequisiteType(value)}>
                  <SelectTrigger className="w-full border-purple-200 focus:ring-purple-300">
                    <SelectValue placeholder="Prerequisite type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="required">Required</SelectItem>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="optional">Optional</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleAddPrerequisite}
                  disabled={!selectedCourse}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-purple-800">Current Prerequisites</h3>

          {prerequisites.length === 0 ? (
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center bg-purple-50/30 hover:bg-purple-50/50 transition-all">
              <p className="text-purple-700 mb-2">No prerequisites added yet</p>
              <p className="text-sm text-indigo-500">
                Add courses that students should complete before taking this one
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {prerequisites.map((prerequisite) => (
                <div
                  key={prerequisite.id}
                  className="flex items-center justify-between p-3 border border-purple-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-purple-900">{prerequisite.courseTitle}</h4>
                    <div className="flex items-center mt-1">
                      <Select
                        value={prerequisite.type}
                        onValueChange={(value) => handleChangePrerequisiteType(prerequisite.id, value)}
                      >
                        <SelectTrigger className="h-7 text-xs border-none bg-purple-50 w-auto text-purple-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="required">Required</SelectItem>
                          <SelectItem value="recommended">Recommended</SelectItem>
                          <SelectItem value="optional">Optional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePrerequisite(prerequisite.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
