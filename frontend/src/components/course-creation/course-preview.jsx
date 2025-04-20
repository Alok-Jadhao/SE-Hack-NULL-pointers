"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, BookOpen, CheckCircle, Lock, ChevronRight, FileText, Video, ImageIcon, Link, File } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoursePreview({ course }) {
  const [activeTab, setActiveTab] = useState("student")

  // Calculate total course duration
  const calculateTotalDuration = () => {
    let totalMinutes = 0

    if (course.modules && course.modules.length > 0) {
      course.modules.forEach((module) => {
        if (module.lessons && module.lessons.length > 0) {
          module.lessons.forEach((lesson) => {
            totalMinutes += lesson.timeEstimate || 0
          })
        }
      })
    }

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return { hours, minutes, totalMinutes }
  }

  const { hours, minutes, totalMinutes } = calculateTotalDuration()

  // Count total lessons
  const totalLessons = course.modules?.reduce((acc, module) => acc + (module.lessons?.length || 0), 0) || 0

  const getContentTypeIcon = (contentType) => {
    switch (contentType) {
      case "video":
        return <Video className="h-4 w-4 text-purple-600" />
      case "pdf":
        return <FileText className="h-4 w-4 text-purple-600" />
      case "text":
        return <FileText className="h-4 w-4 text-purple-600" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-purple-600" />
      case "link":
        return <Link className="h-4 w-4 text-purple-600" />
      case "file":
        return <File className="h-4 w-4 text-purple-600" />
      default:
        return <File className="h-4 w-4 text-purple-600" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-3 text-purple-800">Course Preview</h2>
        <p className="text-indigo-600 mb-0">Preview how your course will appear to students and instructors.</p>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-purple-100">
          <TabsTrigger
            value="student"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
          >
            Student View
          </TabsTrigger>
          <TabsTrigger
            value="structure"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
          >
            Course Structure
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="space-y-6">
          <div className="bg-white border border-purple-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
            <div className="relative h-48 bg-gradient-to-r from-purple-100 to-indigo-100">
              {course.thumbnail ? (
                <img
                  src={URL.createObjectURL(course.thumbnail) || "/placeholder.svg"}
                  alt={course.title || "Course thumbnail"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-r from-purple-200 to-indigo-200">
                  <BookOpen className="h-16 w-16 text-purple-400" />
                </div>
              )}

              {course.level && (
                <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700">
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </Badge>
              )}
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2 text-purple-900">{course.title || "Untitled Course"}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-indigo-500 mb-4">
                {totalLessons > 0 && (
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>
                      {totalLessons} {totalLessons === 1 ? "Lesson" : "Lessons"}
                    </span>
                  </div>
                )}

                {totalMinutes > 0 && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {hours > 0 ? `${hours}h ` : ""}
                      {minutes > 0 ? `${minutes}m` : ""}
                    </span>
                  </div>
                )}

                {course.category && (
                  <div className="flex items-center">
                    <span>{course.category}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6">{course.description || "No description provided."}</p>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                Enroll in Course
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-purple-900">Course Content</h3>

            {course.modules && course.modules.length > 0 ? (
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <Card
                    key={module.id || index}
                    className="border-purple-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <CardHeader className="py-4 bg-gradient-to-r from-white to-purple-50">
                      <CardTitle className="text-lg text-purple-800">{module.title || `Module ${index + 1}`}</CardTitle>
                      {module.description && (
                        <CardDescription className="text-indigo-500">{module.description}</CardDescription>
                      )}
                    </CardHeader>

                    {module.lessons && module.lessons.length > 0 && (
                      <CardContent className="py-0">
                        <ul className="divide-y divide-purple-100">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li
                              key={lesson.id || lessonIndex}
                              className="py-3 flex items-center justify-between hover:bg-purple-50 transition-all"
                            >
                              <div className="flex items-center">
                                {lessonIndex === 0 ? (
                                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                ) : (
                                  <Lock className="h-5 w-5 text-purple-400 mr-3" />
                                )}

                                <div>
                                  <div className="flex items-center">
                                    {getContentTypeIcon(lesson.contentType)}
                                    <span className="ml-2 font-medium text-purple-900">
                                      {lesson.title || `Lesson ${lessonIndex + 1}`}
                                    </span>
                                  </div>
                                  {lesson.description && (
                                    <p className="text-sm text-indigo-500 mt-1">{lesson.description}</p>
                                  )}
                                </div>
                              </div>

                              {lesson.timeEstimate > 0 && (
                                <div className="flex items-center text-sm text-indigo-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{lesson.timeEstimate} min</span>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-purple-200 rounded-lg bg-purple-50/30">
                <BookOpen className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-purple-700 mb-2">No content yet</h3>
                <p className="text-indigo-500">Add modules and lessons to see them previewed here</p>
              </div>
            )}
          </div>

          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-purple-900">Prerequisites</h3>
              <Card className="border-purple-100 shadow-sm">
                <CardContent className="py-6">
                  <ul className="space-y-3">
                    {course.prerequisites.map((prerequisite) => (
                      <li key={prerequisite.id} className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                        <span className="text-purple-900">{prerequisite.courseTitle}</span>
                        <Badge variant="outline" className="ml-2 border-purple-200 text-purple-700">
                          {prerequisite.type.charAt(0).toUpperCase() + prerequisite.type.slice(1)}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="structure" className="space-y-6">
          <Card className="border-purple-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-white to-purple-50">
              <CardTitle className="text-purple-800">Course Structure</CardTitle>
              <CardDescription className="text-indigo-500">
                Overview of your course organization and content
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                  <h3 className="font-semibold text-purple-900">Course Details</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all"
                  >
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-indigo-500">Title</h4>
                    <p className="text-purple-900">{course.title || "Untitled Course"}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-indigo-500">Category</h4>
                    <p className="text-purple-900">{course.category || "Uncategorized"}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-indigo-500">Level</h4>
                    <p className="text-purple-900">
                      {course.level ? course.level.charAt(0).toUpperCase() + course.level.slice(1) : "All Levels"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-indigo-500">Total Duration</h4>
                    <p className="text-purple-900">
                      {totalMinutes > 0 ? (
                        <>
                          {hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} ` : ""}
                          {minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : ""}
                        </>
                      ) : (
                        "Not specified"
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium text-indigo-500">Description</h4>
                  <p className="mt-1 text-purple-900">{course.description || "No description provided."}</p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                  <h3 className="font-semibold text-purple-900">Content Structure</h3>
                  <div className="text-sm text-indigo-500">
                    {course.modules?.length || 0} modules, {totalLessons} lessons
                  </div>
                </div>

                {course.modules && course.modules.length > 0 ? (
                  <ul className="space-y-6">
                    {course.modules.map((module, index) => (
                      <li key={module.id || index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-purple-900">{module.title || `Module ${index + 1}`}</h4>
                          <span className="text-sm text-indigo-500">{module.lessons?.length || 0} lessons</span>
                        </div>

                        {module.lessons && module.lessons.length > 0 && (
                          <ul className="pl-6 space-y-1 border-l border-purple-100">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lesson.id || lessonIndex} className="text-sm py-1">
                                <div className="flex items-center">
                                  {getContentTypeIcon(lesson.contentType)}
                                  <span className="ml-2 text-purple-900">
                                    {lesson.title || `Lesson ${lessonIndex + 1}`}
                                  </span>
                                  {lesson.timeEstimate > 0 && (
                                    <span className="ml-2 text-indigo-400">({lesson.timeEstimate} min)</span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 border border-dashed border-purple-200 rounded-lg bg-purple-50/30">
                    <p className="text-indigo-500">No modules or lessons added yet</p>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                  <h3 className="font-semibold text-purple-900">Settings Overview</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all"
                  >
                    Edit Settings
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-indigo-500">Sequential Progress</h4>
                    <p className="text-purple-900">{course.settings?.isSequential ? "Enabled" : "Disabled"}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-indigo-500">Allow Skipping</h4>
                    <p className="text-purple-900">{course.settings?.allowSkipping ? "Enabled" : "Disabled"}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-indigo-500">Show Time Estimates</h4>
                    <p className="text-purple-900">{course.settings?.showEstimates ? "Enabled" : "Disabled"}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-indigo-500">Enforce Prerequisites</h4>
                    <p className="text-purple-900">{course.settings?.enforcePrerequisites ? "Enabled" : "Disabled"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
