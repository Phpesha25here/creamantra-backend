import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Bookings = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/admin");

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        `/api/bookings/admin/${bookingId}`,
        { status: newStatus }
      );

      if (data.success) {
        toast.success(data.message);
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Status update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchBookings();
    }
  }, [admin]);

  return (
    <div className="py-24 px-3 sm:px-6">
      <h1 className="text-3xl font-bold text-center my-3">All Bookings</h1>

      <div className="border border-gray-400 max-w-5xl mx-auto p-3 rounded-lg">
        <div className="hidden md:grid grid-cols-6 font-semibold text-gray-700 mb-4">
          <div>Name</div>
          <div>Phone</div>
          <div>Members</div>
          <div>Date</div>
          <div>Time</div>
          <div>Status</div>
        </div>

        <ul className="space-y-4">
          {bookings.length === 0 ? (
            <p className="text-center text-gray-500">No bookings found</p>
          ) : (
            bookings.map((item) => (
              <li key={item._id} className="border rounded-lg p-3 md:p-2">
                <div className="flex flex-col md:grid md:grid-cols-6 md:items-center gap-2">
                  <p className="font-medium text-center md:text-left">
                    {item.name}
                  </p>

                  <p className="font-medium text-center md:text-left">
                    {item.phone}
                  </p>

                  <p className="text-gray-600 text-center md:text-left">
                    {item.members}
                  </p>

                  <p className="text-gray-600 text-center md:text-left">
                    {item.date}
                  </p>

                  <p className="text-gray-600 text-center md:text-left">
                    {item.time}
                  </p>

                  <div className="flex justify-center md:justify-start items-center gap-2">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      disabled={loading}
                      className="border rounded-md px-3 py-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Bookings;