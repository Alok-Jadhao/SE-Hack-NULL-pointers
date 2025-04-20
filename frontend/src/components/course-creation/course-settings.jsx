"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CourseSettings({ course, onUpdate }) {
  const handleToggleChange = (field, value) => {
    onUpdate({
      settings: {
        ...course.settings,
        [field]: value,
      },
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-3 text-purple-800">Course Settings</h2>
        <p className="text-indigo-600 mb-0">
          Configure how students will interact with your course and progress through the content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-100 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-white to-purple-50">
            <CardTitle className="text-purple-800">Learning Path Settings</CardTitle>
            <CardDescription className="text-indigo-500">
              Configure how students progress through your course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="sequential-progress" className="font-medium text-purple-900">
                    Sequential Progress
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">
                          When enabled, students must complete lessons in order. They cannot skip ahead to future
                          lessons until they've completed the current one.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Require students to complete lessons in order</p>
              </div>
              <Switch
                id="sequential-progress"
                checked={course.settings?.isSequential ?? true}
                onCheckedChange={(checked) => handleToggleChange("isSequential", checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="allow-skipping" className="font-medium text-purple-900">
                    Allow Skipping
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">
                          When enabled, students can mark a lesson as complete without actually completing it, allowing
                          them to move forward.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Allow students to skip lessons they don't want to complete</p>
              </div>
              <Switch
                id="allow-skipping"
                checked={course.settings?.allowSkipping ?? false}
                onCheckedChange={(checked) => handleToggleChange("allowSkipping", checked)}
                disabled={!course.settings?.isSequential}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="show-estimates" className="font-medium text-purple-900">
                    Show Time Estimates
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">
                          When enabled, students will see estimated completion times for each lesson and module.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Display estimated completion times for lessons</p>
              </div>
              <Switch
                id="show-estimates"
                checked={course.settings?.showEstimates ?? true}
                onCheckedChange={(checked) => handleToggleChange("showEstimates", checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-white to-purple-50">
            <CardTitle className="text-purple-800">Content Access Settings</CardTitle>
            <CardDescription className="text-indigo-500">
              Configure how content is delivered to students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="drip-content" className="font-medium text-purple-900">
                    Drip Content
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">
                          When enabled, course content is released gradually over time rather than all at once.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Release course content gradually over time</p>
              </div>
              <Switch
                id="drip-content"
                checked={course.settings?.dripContent ?? false}
                onCheckedChange={(checked) => handleToggleChange("dripContent", checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="enforce-prerequisites" className="font-medium text-purple-900">
                    Enforce Prerequisites
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">
                          When enabled, students must complete all required prerequisite courses before accessing this
                          course.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Require completion of prerequisite courses</p>
              </div>
              <Switch
                id="enforce-prerequisites"
                checked={course.settings?.enforcePrerequisites ?? true}
                onCheckedChange={(checked) => handleToggleChange("enforcePrerequisites", checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="downloadable-content" className="font-medium text-purple-900">
                    Downloadable Content
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">When enabled, students can download course materials for offline use.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Allow students to download course materials</p>
              </div>
              <Switch
                id="downloadable-content"
                checked={course.settings?.downloadableContent ?? true}
                onCheckedChange={(checked) => handleToggleChange("downloadableContent", checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-white to-purple-50">
            <CardTitle className="text-purple-800">Student Engagement</CardTitle>
            <CardDescription className="text-indigo-500">
              Configure features that enhance student engagement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="enable-discussions" className="font-medium text-purple-900">
                    Enable Discussions
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">When enabled, students can participate in discussions for each lesson.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Allow students to discuss course content</p>
              </div>
              <Switch
                id="enable-discussions"
                checked={course.settings?.enableDiscussions ?? true}
                onCheckedChange={(checked) => handleToggleChange("enableDiscussions", checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="enable-progress-tracking" className="font-medium text-purple-900">
                    Progress Tracking
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">When enabled, students can track their progress through the course.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Show progress indicators and completion status</p>
              </div>
              <Switch
                id="enable-progress-tracking"
                checked={course.settings?.enableProgressTracking ?? true}
                onCheckedChange={(checked) => handleToggleChange("enableProgressTracking", checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor="enable-certificates" className="font-medium text-purple-900">
                    Completion Certificates
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-purple-400 ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-900 text-white">
                        <p className="w-80">When enabled, students receive a certificate upon course completion.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-indigo-500">Issue certificates when students complete the course</p>
              </div>
              <Switch
                id="enable-certificates"
                checked={course.settings?.enableCertificates ?? false}
                onCheckedChange={(checked) => handleToggleChange("enableCertificates", checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
