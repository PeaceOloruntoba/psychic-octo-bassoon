import Register from "../components/auth/Register";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router";

function RegisterPage() {
  const { user } = useAuthStore();

  if (user?.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Register />
    </div>
  );
}

export default RegisterPage;
