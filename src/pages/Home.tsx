import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router";

function Home() {
  const { user, loadUser } = useAuthStore();

  if (!user) {
    loadUser();
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      <p className="text-gray-600">Role: {user.role}</p>
      {user.department && (
        <p className="text-gray-600">Department: {user.department}</p>
      )}
      <div className="mt-4">
        <p className="text-lg">
          Use the navigation bar to access memos, archives, or admin functions
          (if applicable).
        </p>
      </div>
    </div>
  );
}

export default Home;
