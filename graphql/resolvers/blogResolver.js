const Blog = require("../../models/blogModel");
const { isAuthorized } = require("../../utils/utils");

const getAllBlogs = async () => {
  return await Blog.find().populate("author");
};

const getBlogById = async (_, { id }) => {
  return await Blog.findById(id).populate("author");
};

const createBlog = async (_, { title, content, author }, { user }) => {
  isAuthorized(user);
  return await Blog.create({ title, content, author });
};

const updateBlog = async (_, { id, title, content, author }, { user }) => {
  isAuthorized(user);
  return await Blog.findByIdAndUpdate(
    id,
    { title, content, author },
    { new: true }
  );
};

const deleteBlog = async (_, { id }, { user }) => {
  isAuthorized(user);
  return await Blog.findByIdAndDelete(id);
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
