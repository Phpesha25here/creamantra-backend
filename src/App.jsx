import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuDetails from "./pages/MenuDetails";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BookTable from "./pages/BookTable";
import MyBookings from "./pages/MyBookings";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AddCategory from "./pages/admin/AddCategory";
import AddMenu from "./pages/admin/AddMenu";
import Categories from "./pages/admin/Categories";
import Menus from "./pages/admin/Menus";
import Orders from "./pages/admin/Orders";
import Bookings from "./pages/admin/Bookings";
import Customers from "./pages/admin/Customers"; // ✅ ADDED

const App = () => {
  const location = useLocation();
  const adminPath = location.pathname.startsWith("/admin");

  const { admin, loadingAuth } = useContext(AppContext);

  // 🔥 IMPORTANT FIX: block UI until auth is ready
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Toaster />

      {!adminPath && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-details/:id" element={<MenuDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin-login"
          element={!admin ? <AdminLogin /> : <Navigate to="/admin" />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            admin ? (
              <AdminLayout />
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="categories" element={<Categories />} />
          <Route path="menus" element={<Menus />} />
          <Route path="orders" element={<Orders />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="customers" element={<Customers />} /> {/* ✅ ADDED */}
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!adminPath && <Footer />}
    </div>
  );
};

export default App;