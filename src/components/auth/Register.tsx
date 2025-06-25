import { useState } from "react";
import { useAdminStore } from "../../stores/adminStore";
import { useNavigate } from "react-router";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Admin" | "Staff" | "Student">("Staff");
  const [department, setDepartment] = useState("");
  const { registerUser } = useAdminStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({
        name,
        email,
        password,
        role,
        department: role === "Admin" ? undefined : department,
      });
      navigate("/admin");
    } catch (error) {
      // Error handled by Sonner in adminStore
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "Admin" | "Staff" | "Student")
            }
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={role === "Admin"}
            required={role !== "Admin"}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
