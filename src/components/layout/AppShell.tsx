import { Outlet } from "react-router-dom"

export default function AppShell() {
  return (
    <div className="flex min-h-svh">
      <Outlet />
    </div>
  )
}
