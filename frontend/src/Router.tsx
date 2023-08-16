import { Route, Routes } from "react-router-dom";
import { Connection } from "./pages/Connection";
import { Dashboard } from "./pages/Dashboard";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Connection />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}