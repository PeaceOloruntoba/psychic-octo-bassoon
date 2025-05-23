import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          IMMS
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/memos" className="hover:underline">
            Memos
          </Link>
          <Link to="/archive" className="hover:underline">
            Archive
          </Link>
          {user?.role === "Admin" && (
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          )}
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
