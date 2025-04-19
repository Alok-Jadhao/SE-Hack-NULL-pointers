import "../../style.css"

export const metadata = {
  title: "Instructor Dashboard - Online Learning Platform",
  description: "Instructor dashboard for managing courses and students",
  generator: 'v0.dev'
}

export default function InstructorLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
} 