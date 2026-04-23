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

    // ✅ NAME VALIDATION (only letters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return alert("Name should contain only letters");
    }

    // ✅ EMAIL VALIDATION
    if ((email.match(/@/g) || []).length !== 1) {
      return alert("Email must contain only one @");
    }

    const emailRegex = /^[A-Za-z0-9]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return alert("Only @gmail.com emails allowed (no special characters)");
    }

    // ✅ Required fields check
    if (!name || !email || !subject || !message) {
      return alert("Please fill all required fields");
    }

    try {
      const res = await axios.post(
        "https://creamantra-backend.onrender.com/api/contact",
        formData
      );

      if (res.data.success) {
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        }, 3000);
      }

    } catch (error) {
      console.log("ERROR:", error);
      alert(
        error.response?.data?.message ||
        "Something went wrong (check backend)"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
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

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Contact Information
            </h2>

            <div className="space-y-6">

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    Shop No 10, Poonam Tower, Dharshana Society, Sector 20,
                    <br />
                    Nerul, Navi Mumbai, Maharashtra 400706.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Phone
                  </h3>
                  <p className="text-gray-600">093737 51081</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Follow Us
                  </h3>

                  <div className="flex gap-4 mt-2">
                    <a
                      href="https://x.com/creamantra67958"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="text-blue-500 hover:scale-110 transition" />
                    </a>

                    <a
                      href="https://www.facebook.com/people/Creamantra/61584905847627/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="text-blue-700 hover:scale-110 transition" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Opening Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Friday: 11:00 AM - 10:00 PM
                  </p>
                  <p className="text-gray-600">
                    Saturday - Sunday: 10:00 AM - 11:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600"
                alt="Restaurant Location"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="your@gmail.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="+91 9876543210"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Reservation, Inquiry, Feedback..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;