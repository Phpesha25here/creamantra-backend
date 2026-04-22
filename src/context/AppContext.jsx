/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  const [cart, setCart] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);

  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/me");

      if (data?.success) {
        setUser(data.user);
        setAdmin(
          data.user?.role === "admin" || data.user?.isAdmin === true
        );
      } else {
        setUser(null);
        setAdmin(false);
      }
    } catch {
      setUser(null);
      setAdmin(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      setAdmin(false);
      setCart({ items: [] });
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");

      if (data?.success) {
        setCart(data.cart || { items: [] });
      } else {
        setCart({ items: [] });
      }
    } catch {
      setCart({ items: [] });
    }
  };

  const addToCart = async (menuId) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity: 1,
      });

      if (data?.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Please login first");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      setCategories(data?.categories || []);
    } catch {
      setCategories([]);
    }
  };

  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      setMenus(data?.menuItems || []);
    } catch {
      setMenus([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoadingAuth(true);
      try {
        await isAuth();
        await Promise.all([fetchCategories(), fetchMenus()]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingAuth(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (user) fetchCartData();
  }, [user]);

  useEffect(() => {
    const total = (cart?.items || []).reduce((sum, item) => {
      const price = item?.menuItem?.price || 0;
      return sum + price * (item.quantity || 0);
    }, 0);

    setTotalPrice(total);
  }, [cart]);

  const cartCount =
    cart?.items?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    ) || 0;

  const value = {
    axios,
    navigate,
    loading,
    setLoading,
    loadingAuth,
    user,
    setUser,
    admin,
    setAdmin,
    logout,
    categories,
    menus,
    fetchMenus,
    fetchCategories,
    cart,
    cartCount,
    totalPrice,
    addToCart,
    fetchCartData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;