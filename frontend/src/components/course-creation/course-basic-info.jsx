"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function CourseBasicInfo({ course, onUpdate }) {
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setThumbnail(file)
      setThumbnailPreview(URL.createObjectURL(file))
      onUpdate({ thumbnail: file })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    onUpdate({ [name]: value })
  }

  const handleSelectChange = (name, value) => {
    onUpdate({ [name]: value })
  }

  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Personal Development",
    "Photography",
    "Music",
    "Other",
  ]

  const levels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "all-levels", label: "All Levels" },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-3 text-purple-800">Course Basic Information</h2>
        <p className="text-indigo-600 mb-0">
          Provide the essential details about your course to help students understand what they'll learn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-purple-900 font-medium">
              Course Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Complete Web Development Bootcamp"
              value={course.title}
              onChange={handleInputChange}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-purple-900 font-medium">
              Course Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe what students will learn in this course..."
              rows={5}
              value={course.description}
              onChange={handleInputChange}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-purple-900 font-medium">
                Category
              </Label>
              <Select value={course.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger className="border-purple-200 focus:ring-purple-300">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-purple-900 font-medium">
                Difficulty Level
              </Label>
              <Select value={course.level} onValueChange={(value) => handleSelectChange("level", value)}>
                <SelectTrigger className="border-purple-200 focus:ring-purple-300">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-purple-900 font-medium">Course Thumbnail</Label>
          <div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center bg-purple-50/50 hover:bg-purple-50 transition-all">
            {thumbnailPreview ? (
              <div className="relative">
                <img
                  src={thumbnailPreview || "/placeholder.svg"}
                  alt="Course thumbnail preview"
                  className="mx-auto h-48 object-cover rounded-md shadow-md"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    setThumbnail(null)
                    setThumbnailPreview(null)
                    onUpdate({ thumbnail: null })
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="py-8">
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-purple-400 mb-2" />
                  <p className="text-sm text-purple-600 mb-2">Drag and drop an image, or click to browse</p>
                  <p className="text-xs text-purple-400 mb-4">Recommended size: 1280x720px (16:9 ratio)</p>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailChange}
                  />
                  <Button
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-100 transition-all"
                    onClick={() => document.getElementById("thumbnail")?.click()}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
