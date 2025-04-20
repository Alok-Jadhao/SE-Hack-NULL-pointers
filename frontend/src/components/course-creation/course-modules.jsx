"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Video,
  ImageIcon,
  Link,
  File,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CourseModules({ course, onUpdate }) {
  const [modules, setModules] = useState(course.modules || [])
  const [expandedModuleId, setExpandedModuleId] = useState(null)

  const handleAddModule = () => {
    const newModule = {
      id: `module-${Date.now()}`,
      title: "New Module",
      description: "",
      lessons: [],
      isExpanded: true,
    }

    const updatedModules = [...modules, newModule]
    setModules(updatedModules)
    onUpdate({ modules: updatedModules })
    setExpandedModuleId(newModule.id)
  }

  const handleRemoveModule = (moduleId) => {
    const updatedModules = modules.filter((module) => module.id !== moduleId)
    setModules(updatedModules)
    onUpdate({ modules: updatedModules })
  }

  const handleModuleChange = (moduleId, field, value) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return { ...module, [field]: value }
      }
      return module
    })
    setModules(updatedModules)
    onUpdate({ modules: updatedModules })
  }

  const toggleModuleExpand = (moduleId) => {
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId)
  }

  const handleAddLesson = (moduleId) => {
    const newLesson = {
      id: `lesson-${Date.now()}`,
      title: "New Lesson",
      description: "",
      timeEstimate: 15,
      contentType: "video",
      content: "",
      isRequired: true,
    }

    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: [...module.lessons, newLesson],
        }
      }
      return module
    })

    setModules(updatedModules)
    onUpdate({ modules: updatedModules })
  }

  const handleRemoveLesson = (moduleId, lessonId) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
        }
      }
      return module
    })

    setModules(updatedModules)
    onUpdate({ modules: updatedModules })
  }

  const handleLessonChange = (moduleId, lessonId, field, value) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            return { ...lesson, [field]: value }
          }
          return lesson
        })
        return { ...module, lessons: updatedLessons }
      }
      return module
    })

    setModules(updatedModules)
    onUpdate({ modules: updatedModules })
  }

  const getContentTypeIcon = (contentType) => {
    switch (contentType) {
      case "video":
        return <Video className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "link":
        return <Link className="h-4 w-4" />
      case "file":
        return <File className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-3 text-purple-800">Course Modules & Content</h2>
        <p className="text-indigo-600 mb-0">
          Organize your course into modules and lessons. Add content to each lesson to create a structured learning
          path.
        </p>
      </div>

      <div className="space-y-6">
        {modules.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-purple-200 rounded-xl bg-purple-50/30 hover:bg-purple-50/50 transition-all">
            <h3 className="text-lg font-medium text-purple-700 mb-4">No modules yet</h3>
            <p className="text-indigo-500 mb-6">Start building your course by adding your first module</p>
            <Button
              onClick={handleAddModule}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Module
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((module, index) => (
              <Card
                key={module.id}
                className="border border-purple-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <CardHeader className="p-4 pb-0 bg-gradient-to-r from-white to-purple-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-5 w-5 text-purple-400 cursor-move" />
                      <CardTitle className="text-lg">
                        <Input
                          value={module.title}
                          onChange={(e) => handleModuleChange(module.id, "title", e.target.value)}
                          className="font-semibold border-none p-0 h-auto text-lg focus-visible:ring-0 bg-transparent"
                          placeholder="Module Title"
                        />
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleModuleExpand(module.id)}
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                      >
                        {expandedModuleId === module.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveModule(module.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedModuleId === module.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`module-desc-${module.id}`} className="text-purple-900 font-medium">
                              Module Description
                            </Label>
                            <Textarea
                              id={`module-desc-${module.id}`}
                              value={module.description}
                              onChange={(e) => handleModuleChange(module.id, "description", e.target.value)}
                              placeholder="Describe what students will learn in this module..."
                              rows={2}
                              className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-purple-900">Lessons</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddLesson(module.id)}
                                className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Lesson
                              </Button>
                            </div>

                            {module.lessons.length === 0 ? (
                              <div className="text-center py-6 border border-dashed border-purple-200 rounded-lg bg-purple-50/30">
                                <p className="text-indigo-500">No lessons yet. Add your first lesson.</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {module.lessons.map((lesson, lessonIndex) => (
                                  <Card key={lesson.id} className="border border-purple-100 shadow-sm">
                                    <CardContent className="p-4">
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-2">
                                            <GripVertical className="h-5 w-5 text-purple-400 cursor-move" />
                                            <div className="flex-1">
                                              <Input
                                                value={lesson.title}
                                                onChange={(e) =>
                                                  handleLessonChange(module.id, lesson.id, "title", e.target.value)
                                                }
                                                className="font-medium border-none p-0 h-auto focus-visible:ring-0"
                                                placeholder="Lesson Title"
                                              />
                                            </div>
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveLesson(module.id, lesson.id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label
                                              htmlFor={`lesson-desc-${lesson.id}`}
                                              className="text-purple-900 font-medium"
                                            >
                                              Lesson Description
                                            </Label>
                                            <Textarea
                                              id={`lesson-desc-${lesson.id}`}
                                              value={lesson.description}
                                              onChange={(e) =>
                                                handleLessonChange(module.id, lesson.id, "description", e.target.value)
                                              }
                                              placeholder="Describe this lesson..."
                                              rows={2}
                                              className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 transition-all"
                                            />
                                          </div>

                                          <div className="space-y-4">
                                            <div className="flex items-center space-x-4">
                                              <div className="w-1/2 space-y-2">
                                                <Label
                                                  htmlFor={`lesson-time-${lesson.id}`}
                                                  className="flex items-center text-purple-900 font-medium"
                                                >
                                                  <Clock className="h-4 w-4 mr-1 text-purple-600" />
                                                  Time Estimate (minutes)
                                                </Label>
                                                <Input
                                                  id={`lesson-time-${lesson.id}`}
                                                  type="number"
                                                  min="1"
                                                  value={lesson.timeEstimate}
                                                  onChange={(e) =>
                                                    handleLessonChange(
                                                      module.id,
                                                      lesson.id,
                                                      "timeEstimate",
                                                      Number.parseInt(e.target.value),
                                                    )
                                                  }
                                                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 transition-all"
                                                />
                                              </div>
                                              <div className="w-1/2 space-y-2">
                                                <Label
                                                  htmlFor={`lesson-type-${lesson.id}`}
                                                  className="text-purple-900 font-medium"
                                                >
                                                  Content Type
                                                </Label>
                                                <Select
                                                  value={lesson.contentType}
                                                  onValueChange={(value) =>
                                                    handleLessonChange(module.id, lesson.id, "contentType", value)
                                                  }
                                                >
                                                  <SelectTrigger
                                                    id={`lesson-type-${lesson.id}`}
                                                    className="border-purple-200 focus:ring-purple-300"
                                                  >
                                                    <SelectValue />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="video">
                                                      <div className="flex items-center">
                                                        <Video className="h-4 w-4 mr-2 text-purple-600" />
                                                        Video
                                                      </div>
                                                    </SelectItem>
                                                    <SelectItem value="pdf">
                                                      <div className="flex items-center">
                                                        <FileText className="h-4 w-4 mr-2 text-purple-600" />
                                                        PDF
                                                      </div>
                                                    </SelectItem>
                                                    <SelectItem value="text">
                                                      <div className="flex items-center">
                                                        <FileText className="h-4 w-4 mr-2 text-purple-600" />
                                                        Text
                                                      </div>
                                                    </SelectItem>
                                                    <SelectItem value="image">
                                                      <div className="flex items-center">
                                                        <ImageIcon className="h-4 w-4 mr-2 text-purple-600" />
                                                        Image
                                                      </div>
                                                    </SelectItem>
                                                    <SelectItem value="link">
                                                      <div className="flex items-center">
                                                        <Link className="h-4 w-4 mr-2 text-purple-600" />
                                                        External Link
                                                      </div>
                                                    </SelectItem>
                                                    <SelectItem value="file">
                                                      <div className="flex items-center">
                                                        <File className="h-4 w-4 mr-2 text-purple-600" />
                                                        Other File
                                                      </div>
                                                    </SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                            </div>

                                            <div className="space-y-2">
                                              <Label
                                                htmlFor={`lesson-content-${lesson.id}`}
                                                className="text-purple-900 font-medium"
                                              >
                                                {lesson.contentType === "video" && "Video URL"}
                                                {lesson.contentType === "pdf" && "PDF File"}
                                                {lesson.contentType === "text" && "Text Content"}
                                                {lesson.contentType === "image" && "Image"}
                                                {lesson.contentType === "link" && "External Link"}
                                                {lesson.contentType === "file" && "File Upload"}
                                              </Label>

                                              {lesson.contentType === "text" ? (
                                                <Textarea
                                                  id={`lesson-content-${lesson.id}`}
                                                  value={lesson.content}
                                                  onChange={(e) =>
                                                    handleLessonChange(module.id, lesson.id, "content", e.target.value)
                                                  }
                                                  placeholder="Enter text content here..."
                                                  rows={3}
                                                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 transition-all"
                                                />
                                              ) : (
                                                <div className="flex items-center space-x-2">
                                                  <Input
                                                    id={`lesson-content-${lesson.id}`}
                                                    value={lesson.content}
                                                    onChange={(e) =>
                                                      handleLessonChange(
                                                        module.id,
                                                        lesson.id,
                                                        "content",
                                                        e.target.value,
                                                      )
                                                    }
                                                    placeholder={
                                                      lesson.contentType === "video"
                                                        ? "Enter video URL"
                                                        : lesson.contentType === "pdf"
                                                          ? "Upload or enter PDF URL"
                                                          : lesson.contentType === "image"
                                                            ? "Upload or enter image URL"
                                                            : lesson.contentType === "link"
                                                              ? "Enter external link"
                                                              : "Upload file or enter URL"
                                                    }
                                                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 transition-all"
                                                  />
                                                  {(lesson.contentType === "pdf" ||
                                                    lesson.contentType === "image" ||
                                                    lesson.contentType === "file") && (
                                                    <Button
                                                      variant="outline"
                                                      size="sm"
                                                      className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all"
                                                    >
                                                      Upload
                                                    </Button>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}

            <Button
              onClick={handleAddModule}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
