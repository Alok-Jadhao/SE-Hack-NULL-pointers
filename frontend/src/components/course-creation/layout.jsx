"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import CourseHeader from "./course-header"
import CourseSidebar from "./course-sidebar"
import CourseBasicInfo from "./course-basic-info"
import CourseModules from "./course-modules"
import CoursePrerequisites from "./course-prerequisites"
import CourseSettings from "./course-settings"
import CoursePreview from "./course-preview"

export default function CourseCreationLayout() {
  const [activeTab, setActiveTab] = useState("info")
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    thumbnail: null,
    modules: [],
    prerequisites: [],
    settings: {
      isSequential: true,
      allowSkipping: false,
      showEstimates: true,
    },
  })

  const handleCourseUpdate = (data) => {
    setCourse((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CourseHeader />
      <div className="flex flex-col md:flex-row flex-1">
        <CourseSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <motion.main
          className="flex-1 p-4 md:p-8 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "info" && <CourseBasicInfo course={course} onUpdate={handleCourseUpdate} />}
          {activeTab === "modules" && <CourseModules course={course} onUpdate={handleCourseUpdate} />}
          {activeTab === "prerequisites" && <CoursePrerequisites course={course} onUpdate={handleCourseUpdate} />}
          {activeTab === "settings" && <CourseSettings course={course} onUpdate={handleCourseUpdate} />}
          {activeTab === "preview" && <CoursePreview course={course} />}
        </motion.main>
      </div>
    </div>
  )
}
