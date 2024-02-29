const {
  getUserById,
  getAllUsers,
  createUser,
  login,
  editUser,
  deleteUser,
} = require("./userResolvers");
const {
  getAllTables,
  createTable,
  editTable,
  deleteTable,
} = require("./tableResolvers");
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  deleteMenuItem,
  editMenuItem,
} = require("./menuResolver");
const {
  getAllBookings,
  getAllBookingsForUser,
  getBookingById,
  createBooking,
  editBooking,
  deleteBooking,
} = require("./bookResolvers");

const { sendMessage, getAllContactMessage } = require("./contactUsResolver");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("./blogResolver");

// Define resolvers
const resolvers = {
  Query: {
    getAllUsers,
    getUserById,
    getAllTables,
    getAllMenuItems,
    getMenuItemById,
    getAllBookings,
    getAllBookingsForUser,
    getBookingById,
    getAllContactMessage,
    getAllBlogs,
    getBlogById,
  },
  Mutation: {
    createUser,
    login,
    editUser,
    deleteUser,
    createTable,
    editTable,
    deleteTable,
    createMenuItem,
    deleteMenuItem,
    editMenuItem,
    createBooking,
    editBooking,
    deleteBooking,
    sendMessage,
    createBlog,
    updateBlog,
    deleteBlog,
  },
};

module.exports = resolvers;
