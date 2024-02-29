const MenuItem = require("../../models/menuModel");
const { isAuthorized } = require("../../utils/utils");

const getAllMenuItems = async (_, { limit = 8, offset = 0, category }) => {
  let query = {};

  if (category) {
    query = {
      categories: { $regex: new RegExp(category, "i") },
    };
  }

  return await MenuItem.find(query).limit(limit).skip(offset);
};

const getMenuItemById = async (_, { menuItemId }) =>
  await MenuItem.findById({ menuItemId });

const createMenuItem = async (
  _,
  { name, description, price, categories, imageUrl, isAvailable },
  { user }
) => {
  isAuthorized(user, "admin");
  return await MenuItem.create(_, {
    name,
    description,
    price,
    categories,
    imageUrl,
    isAvailable,
  });
};

const deleteMenuItem = async (_, { menuItemId }, { user }) => {
  isAuthorized(user, "admin");
  return await MenuItem.findByIdAndDelete(menuItemId);
};
const editMenuItem = async (_, { menuItemId, menuItemInput }) => {
  isAuthorized(user, "admin");

  return await MenuItem.findByIdAndUpdate(menuItemId, menuItemInput, {
    new: true,
  });
};
module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  deleteMenuItem,
  editMenuItem,
};

// const menuItems = require("./menu.json");
// menuItems.forEach((menuItem) => {
//   const newMenuItem = new MenuItem(menuItem);
//   newMenuItem
//     .save()
//     .then(() => console.log("Menu item inserted:", menuItem.name))
//     .catch((err) => console.error("Error inserting menu item:", err));
// });
