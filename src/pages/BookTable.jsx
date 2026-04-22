import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const BookTable = () => {
  const { axios } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    members: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      members: "",
      date: "",
      time: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const { name, email, phone, members, date, time } = formData;

    const membersCount = Number(members);

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return toast.error("Invalid name");
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return toast.error("Invalid phone number");
    }

    const emailRegex = /^[A-Za-z0-9]+@gmail\.com$/;
    if ((email.match(/@/g) || []).length !== 1) {
      return toast.error("Invalid email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format");
    }

    if (membersCount < 1 || membersCount > 10) {
      return toast.error("Members must be 1 to 10");
    }

    const today = new Date();
    const selectedDate = new Date(date);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return toast.error("Invalid date");
    }

    const [hours] = time.split(":").map(Number);
    if (hours >= 23) {
      return toast.error("Invalid time");
    }

    try {
      setLoading(true);

      const { data } = await axios.post("/api/bookings", formData);

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Booking successful");
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white border border-orange-200 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Book a Table
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-orange-200 focus:border-orange-500 outline-none p-3 rounded-lg"
          />

          <input
            type="text"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-orange-200 focus:border-orange-500 outline-none p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border border-orange-200 focus:border-orange-500 outline-none p-3 rounded-lg"
          />

          <input
            type="number"
            name="members"
            placeholder="Number of Members"
            value={formData.members}
            onChange={handleChange}
            className="border border-orange-200 focus:border-orange-500 outline-none p-3 rounded-lg"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-orange-200 focus:border-orange-500 outline-none p-3 rounded-lg"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-orange-200 focus:border-orange-500 outline-none p-3 rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Special Requests"
            value={formData.message}
            onChange={handleChange}
            className="border border-orange-200 focus:border-orange-500 outline-none p-3 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTable;