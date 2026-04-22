import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyBookings = () => {
  const { axios } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/my-bookings");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
          My Bookings
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-orange-200 shadow-md rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.name}
                  </h3>

                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {booking.phone}
                  </p>

                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(booking.date).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="font-medium">Time:</span> {booking.time}
                  </p>

                  <p>
                    <span className="font-medium">Members:</span>{" "}
                    {booking.members}
                  </p>
                </div>

                {booking.message && (
                  <div className="mt-4 text-gray-700">
                    <span className="font-medium">Message:</span>{" "}
                    {booking.message}
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-500">
                  Booked on{" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;