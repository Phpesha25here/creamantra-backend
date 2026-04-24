import React, { useState } from "react";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { name, email, subject, message } = formData;

    // ✅ Name validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return alert("Name should contain only letters");
    }

    // ✅ Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return alert("Enter valid Gmail only");
    }

    // ✅ Required fields
    if (!name || !email || !subject || !message) {
      return alert("Please fill all required fields");
    }

    try {
      const res = await axios.post(
        "/api/contact", // ✅ USE BASE URL (IMPORTANT)
        formData
      );

      if (res.data.success) {
        setSubmitted(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 3000);
      }

    } catch (error) {
      console.log("ERROR:", error);
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl">We'd love to hear from you</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

          <div className="space-y-6">

            <div className="flex space-x-4">
              <div className="bg-orange-500 p-3 rounded-lg">
                <MapPin className="text-white" />
              </div>
              <p>
                Nerul, Navi Mumbai, Maharashtra 400706
              </p>
            </div>

            <div className="flex space-x-4">
              <div className="bg-orange-500 p-3 rounded-lg">
                <Phone className="text-white" />
              </div>
              <p>093737 51081</p>
            </div>

            <div className="flex space-x-4">
              <div className="bg-orange-500 p-3 rounded-lg">
                <Clock className="text-white" />
              </div>
              <p>Mon-Sun: 10 AM - 11 PM</p>
            </div>

            {/* ✅ FIXED SOCIAL ICONS */}
            <div>
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-4 text-xl">
                <a href="https://x.com/" target="_blank">
                  <FaTwitter className="text-blue-500" />
                </a>
                <a href="https://facebook.com/" target="_blank">
                  <FaFacebook className="text-blue-700" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Send Message</h2>

          {submitted && (
            <div className="mb-4 text-green-600">
              Message sent successfully!
            </div>
          )}

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full mb-3 p-2 border rounded"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full mb-3 p-2 border rounded"
          />

          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-6 py-2 rounded flex items-center gap-2"
          >
            <Send size={16} /> Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Contact;