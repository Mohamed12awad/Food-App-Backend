const Table = require("../../models/tableModel");
const { isAuthorized } = require("../../utils/utils");

const getAllTables = async () => await Table.find();

const createTable = async (_, { number, capacity, status }, { user }) => {
  isAuthorized(user, "admin");
  return await Table.create({ number, capacity, status });
};

const deleteTable = async (_, { tableId }, { user }) => {
  isAuthorized(user, "admin");
  return await Table.findByIdAndDelete(tableId);
};

const editTable = async (_, { tableId, tableInput }, { user }) => {
  isAuthorized(user, "admin");
  return await Table.findByIdAndUpdate(tableId, tableInput, { new: true });
};
module.exports = { getAllTables, createTable, deleteTable, editTable };
