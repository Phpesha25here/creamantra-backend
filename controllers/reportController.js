import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Menu from "../models/menuModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let matchStage = { status: { $ne: "Cancelled" } };

    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const totalUsers = await User.countDocuments({ isAdmin: false });
    const totalProducts = await Menu.countDocuments();
    const totalOrders = await Order.countDocuments(matchStage);

    const revenueData = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$items" },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] },
          },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    const monthlyData = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$items" },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const chartData = [];

    for (let i = 1; i <= 12; i++) {
      const found = monthlyData.find(
        (m) => m._id.month === i
      );

      chartData.push({
        month: months[i - 1],
        revenue: found ? found.revenue : 0,
      });
    }

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        chartData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};