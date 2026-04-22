import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddCategory = () => {
  const { navigate, loading, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({ name: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const form = new FormData();
      form.append("name", formData.name);
      form.append("image", file);

      const response = await axios.post(
        "http://localhost:5000/api/category/add",
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/categories");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff7f0] flex items-start justify-start px-8 py-12">
      <div className="w-full max-w-md">

        {/* Page heading */}
        <h1
          className="text-3xl font-bold text-[#1a1a1a] tracking-tight mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Add Category
        </h1>
        <p className="text-sm text-[#999] mb-8 tracking-wide">
          Fill in the details to create a new category
        </p>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#ffe0cc] rounded-2xl p-8 flex flex-col gap-5 shadow-sm"
        >

          {/* Image Preview */}
          <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-dashed border-[#ffd0b0] bg-[#fff7f0] flex items-center justify-center">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#ffb07a] text-xs">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[#ffb07a]">Image preview</span>
              </div>
            )}
          </div>

          {/* Name field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-widest text-[#f97316] font-semibold">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Electronics, Apparel..."
              onChange={handleChange}
              required
              className="bg-[#fff7f0] border border-[#ffe0cc] rounded-lg px-4 py-3 text-[#1a1a1a] text-sm placeholder-[#ccc] outline-none focus:border-[#f97316] focus:ring-2 focus:ring-orange-100 transition-all duration-200"
            />
          </div>

          {/* File upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-widest text-[#f97316] font-semibold">
              Category Image
            </label>
            <label className="relative flex items-center gap-3 bg-[#fff7f0] border-2 border-dashed border-[#ffd0b0] hover:border-[#f97316] hover:bg-orange-50 rounded-lg px-4 py-4 cursor-pointer transition-all duration-200">
              <input
                type="file"
                onChange={handleFileChange}
                required
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-9 h-9 rounded-lg bg-orange-100 border border-[#ffd0b0] flex items-center justify-center text-[#f97316] shrink-0">
                <Upload size={15} />
              </div>
              <div>
                <span className="block text-sm text-[#1a1a1a] font-medium">
                  {file ? file.name : "Choose file"}
                </span>
                <span className="text-xs text-[#aaa]">PNG, JPG, WEBP up to 10MB</span>
              </div>
            </label>
          </div>

          {/* Submit button */}
          <button
            disabled={loading}
            className="w-full mt-1 bg-[#f97316] hover:bg-[#ea6c0a] disabled:bg-[#fbd0b0] disabled:text-white disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide rounded-lg py-3 transition-colors duration-200 active:scale-[0.99]"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddCategory;