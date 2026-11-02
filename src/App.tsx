import { Route, Routes } from "react-router";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LaunchDetailsPage from "./pages/LaunchDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/launch/:id" element={<LaunchDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DashboardLayout>
  )
}

export default App
