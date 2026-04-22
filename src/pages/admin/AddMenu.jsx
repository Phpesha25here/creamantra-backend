import { Upload } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories, fetchMenus } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));

      setFormData((prev) => ({
        ...prev,
        image: selectedFile,
      }));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ FormData
      const sendData = new FormData();
      sendData.append("name", formData.name);
      sendData.append("price", formData.price);
      sendData.append("description", formData.description);
      sendData.append("category", formData.category);
      sendData.append("image", formData.image);

      const { data } = await axios.post("/api/menu/add", sendData);

      if (data?.success) {
        toast.success(data.message);

        await fetchMenus(); // 🔥 refresh menus

        navigate("/admin/menus");
      } else {
        toast.error(data.message || "Failed to add menu");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full flex flex-col gap-5"
      >
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Menu Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Menu Price *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select category</option>
            {categories?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Image *
          </label>

          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={handleFileChange}
            required
          />

          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer"
          >
            <Upload className="w-8 h-8 mb-2" />
            <span className="text-sm">
              {file ? file.name : "Click to upload"}
            </span>
          </label>
        </div>

        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}

        {/* SUBMIT */}
        <button className="bg-orange-500 text-white py-3">
          {loading ? "Adding..." : "Add Menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;