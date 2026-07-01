import { createBrowserRouter } from "react-router-dom"

import AppShell from "@/components/layout/AppShell"
import AuthRedirectHandler from "@/components/auth/AuthRedirectHandler"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import LandingPage from "@/pages/landing/LandingPage"
import LoginPage from "@/pages/auth/LoginPage"
import DashboardPage from "@/pages/dashboard/DashboardPage"
import MeetingsPage from "@/pages/meetings/MeetingsPage"
import MeetingDetailsPage from "@/pages/meetings/MeetingDetailsPage"
import DocumentPreviewPage from "@/pages/documents/DocumentPreviewPage"
import SearchPage from "@/pages/search/SearchPage"
import UsersPage from "@/pages/users/UsersPage"
import OnboardingPage from "@/pages/onboarding/OnboardingPage"
import NotFoundPage from "@/pages/not-found/NotFoundPage"

const router = createBrowserRouter([
  {
    // Root layout: processes the MSAL redirect response on every page load
    // and fires syncUser when LOGIN_SUCCESS is detected.
    element: <AuthRedirectHandler />,
    children: [
      // Public routes
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },

      // Protected routes — ProtectedRoute guards auth + onboarding redirect,
      // AppShell provides the sidebar + topbar layout.
      {
        element: <ProtectedRoute />,
        children: [
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
        ],
      },

      // Fallback
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
