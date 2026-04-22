import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Package,
  ShoppingCart,
  UserCircle,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout, cart } = useContext(AppContext);

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="font-bold text-xl text-red-500">
          Creamantra
        </Link>

        {/* MENU */}
        <div className="hidden md:flex gap-6 text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/book-table">Book Table</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <button onClick={() => navigate("/cart")} className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          </button>

          {/* USER */}
          {user ? (
            <div className="relative">

              <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <UserCircle size={30} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border">

                  <Link to="/my-bookings" className="block px-4 py-2 hover:bg-gray-100">
                    <Calendar size={16} className="inline mr-2" />
                    My Bookings
                  </Link>

                  <Link to="/my-orders" className="block px-4 py-2 hover:bg-gray-100">
                    <Package size={16} className="inline mr-2" />
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} className="inline mr-2" />
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;