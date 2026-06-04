import { createBrowserRouter } from "react-router-dom"

import AppShell from "@/components/layout/AppShell"
import LandingPage from "@/pages/landing/LandingPage"
import LoginPage from "@/pages/auth/LoginPage"
import DashboardPage from "@/pages/dashboard/DashboardPage"
import MeetingsPage from "@/pages/meetings/MeetingsPage"
import MeetingDetailsPage from "@/pages/meetings/MeetingDetailsPage"
import DocumentPreviewPage from "@/pages/documents/DocumentPreviewPage"
import SearchPage from "@/pages/search/SearchPage"
import UsersPage from "@/pages/users/UsersPage"
import NotFoundPage from "@/pages/not-found/NotFoundPage"

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  // Protected routes — share the AppShell layout (sidebar + topbar)
  {
    element: <AppShell />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/meetings",
        element: <MeetingsPage />,
      },
      {
        path: "/meetings/:id",
        element: <MeetingDetailsPage />,
      },
      {
        path: "/documents/:id",
        element: <DocumentPreviewPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
    ],
  },

  // Fallback
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export default router
