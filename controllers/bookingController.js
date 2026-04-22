import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
  try {
    let { name, email, phone, members, date, time, message } = req.body;

    if (!name || !email || !phone || !members || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    email = email.trim().toLowerCase();

    const emailRegex = /^[A-Za-z0-9]+(\.[A-Za-z0-9]+){0,2}@[A-Za-z0-9]+(\.[A-Za-z0-9]+){1,2}$/;

    if ((email.match(/@/g) || []).length !== 1 || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid email",
      });
    }

    const existingUserBooking = await Booking.findOne({ email, date, time });

    if (existingUserBooking) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this slot",
      });
    }

    const slotCount = await Booking.countDocuments({ date, time });

    if (slotCount >= 5) {
      return res.status(400).json({
        success: false,
        message: "This time slot is fully booked",
      });
    }

    const booking = await Booking.create({
      user: req.user?._id,
      name,
      email,
      phone,
      members,
      date,
      time,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this slot",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Booking failed",
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user?._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching bookings",
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching all bookings",
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};