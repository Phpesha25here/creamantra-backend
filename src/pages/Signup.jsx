import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon, User2Icon } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Signup = () => {
  const { navigate, loading, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 NAME VALIDATION (ONLY LETTERS + SPACE)
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(formData.name)) {
      return toast.error("Name should contain only letters");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if (res && res.data) {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      }

    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error or backend not running");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
      >
        <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium">
          Register
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
          Please sign up to continue
        </p>

        {/* NAME */}
        <div className="flex items-center w-full mt-4 border h-12 rounded-full pl-6 gap-2">
          <User2Icon />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              const value = e.target.value;
              // 🔥 allow only letters while typing
              if (/^[A-Za-z\s]*$/.test(value)) {
                onChangeHandler(e);
              }
            }}
            required
            className="bg-transparent w-full outline-none"
          />
        </div>

        {/* EMAIL */}
        <div className="flex items-center w-full mt-4 border h-12 rounded-full pl-6 gap-2">
          <MailIcon />
          <input
            type="email"
            placeholder="Email id"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
            className="bg-transparent w-full outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center mt-4 w-full border h-12 rounded-full pl-6 gap-2">
          <LockIcon />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            required
            className="bg-transparent w-full outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full h-11 rounded-full text-white bg-orange-500 hover:opacity-90 transition"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm mt-4 mb-8">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;