import { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "https://creamantra-backend.onrender.com/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-orange-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-600">
          Customers Information
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and view all registered users
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-orange-500 font-medium">
            Loading customers...
          </div>
        ) : (
          <table className="w-full">

            {/* Table Head */}
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Joined Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b hover:bg-orange-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-orange-50"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-700">
                      {user.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.isAdmin
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "Customer"}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No Customers Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
};

export default Customers;