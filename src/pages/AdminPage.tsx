import { useEffect, useState } from "react";
import { useAdminStore } from "../stores/adminStore";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router";
import type { MemoField } from "../types";

function AdminPage() {
  const { user } = useAuthStore();
  const { users, fields, fetchUsers, updateUser, deleteUser, createMemoField } =
    useAdminStore();
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState<
    "text" | "date" | "select" | "file"
  >("text");
  const [fieldRequired, setFieldRequired] = useState(false);
  const [fieldOptions, setFieldOptions] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (user?.role !== "Admin") {
    return <Navigate to="/" />;
  }

  const handleFieldSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMemoField({
        name: fieldName,
        type: fieldType,
        required: fieldRequired,
        options:
          fieldType === "select"
            ? fieldOptions.split(",").map((opt) => opt.trim())
            : undefined,
      });
      setFieldName("");
      setFieldType("text");
      setFieldRequired(false);
      setFieldOptions("");
    } catch (error) {
      // Error handled by Sonner in adminStore
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-4 bg-white rounded-lg shadow-md flex justify-between"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">Role: {user.role}</p>
                  <p className="text-gray-600">
                    Department: {user.department || "N/A"}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      updateUser(user._id, {
                        name: prompt("New name", user.name) || user.name,
                        department:
                          user.role !== "Admin"
                            ? prompt("New department", user.department) ||
                              user.department
                            : undefined,
                      })
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Manage Memo Fields</h2>
          <form
            onSubmit={handleFieldSubmit}
            className="space-y-4 p-4 bg-white rounded-lg shadow-md"
          >
            <div>
              <label className="block text-sm font-medium">Field Name</label>
              <input
                type="text"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Field Type</label>
              <select
                value={fieldType}
                onChange={(e) =>
                  setFieldType(
                    e.target.value as "text" | "date" | "select" | "file"
                  )
                }
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="text">Text</option>
                <option value="date">Date</option>
                <option value="select">Select</option>
                <option value="file">File</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Required</label>
              <input
                type="checkbox"
                checked={fieldRequired}
                onChange={(e) => setFieldRequired(e.target.checked)}
                className="p-2"
              />
            </div>
            {fieldType === "select" && (
              <div>
                <label className="block text-sm font-medium">
                  Options (comma-separated)
                </label>
                <input
                  type="text"
                  value={fieldOptions}
                  onChange={(e) => setFieldOptions(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Add Field
            </button>
          </form>
          <div className="mt-4 space-y-2">
            {fields.map((field: MemoField) => (
              <div key={field._id} className="p-2 bg-gray-50 rounded-md">
                <p className="font-semibold">{field.name}</p>
                <p className="text-gray-600">Type: {field.type}</p>
                <p className="text-gray-600">
                  Required: {field.required ? "Yes" : "No"}
                </p>
                {field.options && (
                  <p className="text-gray-600">
                    Options: {field.options.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
