import { Outlet } from 'react-router-dom'
import StudentSidebar from '../../components/StudentSidebar'

export default function StudentLayout() {
  return (
    <div className="flex">
      <StudentSidebar />
      <main className="flex-1  ">
        <Outlet />
      </main>
    </div>
  )
} 