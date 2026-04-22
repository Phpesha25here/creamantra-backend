import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Menus = () => {
  const { menus, setMenus, axios } = useContext(AppContext);
  const [deletingId, setDeletingId] = useState(null);

  const deleteMenu = async (id) => {
    if (deletingId) return;

    try {
      setDeletingId(id);

      const { data } = await axios.delete(`/api/menu/delete/${id}`);

      if (data?.success) {
        toast.success(data.message);

        // instant UI update (no delay, no duplicate calls)
        setMenus((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(data?.message || "Delete failed");
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-3">All Menus</h1>

      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-5 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        <hr className="w-full my-4 text-gray-200" />

        <ul>
          {menus.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-5 items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <p>{item.name}</p>
                <p>{item?.category?.name}</p>
                <p>₹{item.price}</p>

                <button
                  disabled={deletingId === item._id}
                  onClick={() => deleteMenu(item._id)}
                  className={`${
                    deletingId === item._id
                      ? "opacity-50 cursor-not-allowed"
                      : "text-red-600 cursor-pointer"
                  }`}
                >
                  <CircleX />
                </button>
              </div>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menus;