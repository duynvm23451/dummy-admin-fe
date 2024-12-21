import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { tokenLoader } from "../services/authenicationService";
import StudentPage from "../pages/StudentPage";
import CoursePage from "../pages/CoursePage";
import CourseDetailPage from "../pages/CourseDetailPage";
import TestsPage from "../pages/TestsPage";
import TestDetailPage from "../pages/TestDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <StudentPage />,
      },
      {
        path: "courses",
        element: <CoursePage />,
      },
      {
        path: "courses/:id",
        element: <CourseDetailPage />,
      },
      {
        path: "tests",
        element: <TestsPage />,
      },
      {
        path: "tests/:id",
        element: <TestDetailPage />,
      },
    ],
  },
]);

export default router;