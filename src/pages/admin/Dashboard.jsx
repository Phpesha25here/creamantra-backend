import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { generatePDF } from "../../utils/generatePDF";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    chartData: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/report/dashboard",
          { withCredentials: true }
        );

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Sales Dashboard
      </h1>

      <button
        onClick={() => generatePDF(stats)}
        className="mb-6 rounded bg-orange-500 px-4 py-2 text-white"
      >
        Download PDF Report
      </button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card
          title="Total Revenue"
          value={`₹${stats.totalRevenue?.toLocaleString() || 0}`}
          icon={<FaMoneyBillWave />}
        />

        <Card
          title="Total Orders"
          value={stats.totalOrders}
          icon={<FaShoppingCart />}
        />

        <Card
          title="Customers"
          value={stats.totalUsers}
          icon={<FaUsers />}
        />
      </div>

      <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Monthly Sales</h2>

        <div id="chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.chartData || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon }) => {
  return (
    <div className="flex items-center rounded-lg bg-white p-6 shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
        {icon}
      </div>
      <div className="ml-4">
        <h2 className="text-sm font-semibold text-gray-500">{title}</h2>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;