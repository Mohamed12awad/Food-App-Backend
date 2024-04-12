const Booking = require("../../models/bookingModel");
const { isAuthorized } = require("../../utils/utils");

const getAllBookings = async (_, __, { user }) => {
  isAuthorized(user, "admin");
  return await Booking.find();
};
const getAllBookingsForUser = async (_, __, { user }) => {
  isAuthorized(user);
  return await Booking.find({ user: user.userId });
};

const getBookingById = async (_, { bookId }, { user }) => {
  isAuthorized(user);

  return await Booking.findById({ bookId });
};
const createBooking = async (_, { bookingInput }, { user }) => {
  isAuthorized(user);
  const { tableId, date, time, partySize, specialRequests, status } =
    bookingInput;

  return await Booking.create({
    user: user.userId,
    table: tableId,
    date,
    time,
    partySize,
    specialRequests,
    status,
  });
};

const deleteBooking = async (_, { bookingId }, { user }) => {
  isAuthorized(user);
  return await Booking.findByIdAndDelete(bookingId);
};

const editBooking = async (_, { bookingId, bookingInput }, { user }) => {
  isAuthorized(user, "admin");

  return await Booking.findByIdAndUpdate(bookingId, bookingInput, {
    new: true,
  });
};
module.exports = {
  getAllBookings,
  getAllBookingsForUser,
  getBookingById,
  createBooking,
  editBooking,
  deleteBooking,
};
