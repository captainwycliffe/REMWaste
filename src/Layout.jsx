import StepProgress from "./components/StepProgress"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <StepProgress />
        <Outlet />
      </div>
    </div>
  )
}
