import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const { navigate, setLoading, loading, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
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
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (!data?.success) {
        toast.error(data?.message || "Login failed");
        return;
      }

      setUser(data.user);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success(data.message || "Login successful");

      setTimeout(() => {
        if (data.user?.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 100);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-orange-100"
      >
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-2">
          Login
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome back! Please enter your details
        </p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition-all font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-500 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;