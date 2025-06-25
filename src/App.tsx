import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { Toaster } from "sonner";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import MemoPage from "./pages/MemoPage";
import ArchivePage from "./pages/ArchivePage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/ui/Navbar";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";

function App() {
  const { user, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {user && <Navbar />}
        <Toaster richColors />
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={
              user?.role === "Admin" ? <RegisterPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/memos"
            element={user ? <MemoPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/archive"
            element={user ? <ArchivePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              user?.role === "Admin" ? <AdminPage /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
