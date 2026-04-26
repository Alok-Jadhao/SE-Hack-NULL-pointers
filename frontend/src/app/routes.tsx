import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { InstructorDashboard } from "./pages/InstructorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { ContentHubPage } from "./pages/ContentHubPage";
import { QuizBattlePage } from "./pages/QuizBattlePage";
import { PerformancePage } from "./pages/PerformancePage";
import { CreateCoursePage } from "./pages/CreateCoursePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LoginPage },
      { path: "student", Component: StudentDashboard },
      { path: "instructor", Component: InstructorDashboard },
      { path: "admin", Component: AdminDashboard },
      { path: "courses", Component: CoursesPage },
      { path: "courses/:courseId", Component: CourseDetailPage },
      { path: "content-hub", Component: ContentHubPage },
      { path: "quiz-battle", Component: QuizBattlePage },
      { path: "quiz-battle/:quizId", Component: QuizBattlePage },
      { path: "performance", Component: PerformancePage },
      { path: "create-course", Component: CreateCoursePage },
    ],
  },
]);
