import { Route, Routes } from "react-router-dom";
import { Connection } from "./pages/Connection";
import { Dashboard } from "./pages/Dashboard";
import { EditJson } from "./pages/EditJson";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Connection />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit/:key" element={<EditJson />} />
    </Routes>
  )
}