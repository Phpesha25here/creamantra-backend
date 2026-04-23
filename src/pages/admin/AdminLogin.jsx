import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LockIcon, MailIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AdminLogin = () => {
  const navigate = useNavigate();

  const { setAdmin, setUser } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://creamantra-backend.onrender.com/api/auth/login",
        formData,
        { withCredentials: true }
      );

      console.log("ADMIN LOGIN RESPONSE:", data);

      // ❌ INVALID RESPONSE
      if (!data?.success || !data?.user) {
        toast.error(data?.message || "Invalid credentials");
        return;
      }

      const user = data.user;

      // ❌ NOT ADMIN
      if (user.role !== "admin" && user.isAdmin !== true) {
        toast.error("Access denied: Not an admin");
        return;
      }

      // ✅ SUCCESS
      setUser(user);
      setAdmin(true);

      toast.success(data.message || "Admin login successful");

      navigate("/admin");

    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);

      toast.error(
        error?.response?.data?.message || "Admin login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-md"
      >

        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Admin Login
        </h1>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2 mb-6">
          Please login to continue
        </p>

        {/* EMAIL */}
        <div className="flex items-center border rounded-full px-4 py-2 mb-4 bg-gray-50 dark:bg-zinc-700">
          <MailIcon className="text-gray-500 mr-2" size={18} />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={onChangeHandler}
            className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-white"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center border rounded-full px-4 py-2 mb-4 bg-gray-50 dark:bg-zinc-700">
          <LockIcon className="text-gray-500 mr-2" size={18} />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={onChangeHandler}
            className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-white"
            required
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
};

export default AdminLogin;