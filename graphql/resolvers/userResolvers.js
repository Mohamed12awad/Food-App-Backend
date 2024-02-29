/**
 * User Resolvers
 *
 * This file contains functions responsible for handling queries and mutations related to users.
 * It includes authentication checks for authorized access and leverages utility functions from `utils.js`.
 */

const User = require("../../models/userModel");
const { createToken, isAuthorized } = require("../../utils/utils");

const getAllUsers = async (_, __, { user }) => {
  isAuthorized(user, "admin");
  return await User.find({});
};
const getUserById = async (_, { userId }, { user }) => {
  isAuthorized(user);

  return await User.findById(userId);
};
const deleteUser = async (_, { userId }, { user }) => {
  isAuthorized(user);

  return await User.findByIdAndDelete(userId);
};
const editUser = async (_, { userId, userInput }, { user }) => {
  isAuthorized(user);

  return await User.findByIdAndUpdate(userId, userInput, { new: true });
};
const createUser = async (
  _,
  { email, password, firstName, lastName, phone, type },
  { user }
) => {
  isAuthorized(user);

  return await User.create({
    email,
    password,
    firstName,
    lastName,
    phone,
    type,
  });
};

const login = async (_, { email, password }, { res }) => {
  try {
    const user = await User.login(email, password);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const token = createToken(user._id, user.type);

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      path: "/",
      httpOnly: true,
    });

    return {
      token,
      user,
    };
  } catch (err) {
    // Log error for debugging
    console.error("Error during login:", err);
    throw new Error("Error signing in");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  login,
  editUser,
  deleteUser,
};
