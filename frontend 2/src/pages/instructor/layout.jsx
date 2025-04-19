import { Outlet } from 'react-router-dom'
import InstructorSidebar from '../../components/InstructorSidebar'

export default function InstructorLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <InstructorSidebar />
      <main className="flex-1  p-8">
        <Outlet /> {/* Renders nested routes like dashboard */}
      </main>
    </div>
  )
}
