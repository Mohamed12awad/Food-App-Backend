const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  number: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "booked", "unavailable"],
    default: "available",
  },
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
