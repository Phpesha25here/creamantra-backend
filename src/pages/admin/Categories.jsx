import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
  const { categories, setCategories, axios } = useContext(AppContext);
  const [deletingId, setDeletingId] = useState(null);

  const deleteCategory = async (id) => {
    if (deletingId !== null) return;

    setDeletingId(id);

    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);

      if (data?.success) {
        toast.success(data.message);

        setCategories((prev) =>
          prev.filter((cat) => cat._id !== id)
        );
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
      <h1 className="text-3xl font-bold mb-3">All Categories</h1>

      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-3 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Action</div>
        </div>

        <hr className="w-full my-4 text-gray-200" />

        <ul>
          {categories.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-3 items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />

                <p>{item.name}</p>

                <button
                  disabled={deletingId !== null}
                  onClick={() => deleteCategory(item._id)}
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

export default Categories;