import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@sonner/react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import MemoPage from "./pages/MemoPage";
import ArchivePage from "./pages/ArchivePage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/ui/Navbar";
import { useAuthStore } from "./stores/authStore";

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {user && <Navbar />}
        <Toaster richColors />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/memos" element={<MemoPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
