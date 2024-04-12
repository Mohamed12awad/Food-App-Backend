// Import necessary libraries
// const { buildSchema } = require("graphql");

// Define GraphQL schema
// const schema = buildSchema()`
const schema = `
type User {
  _id: ID! 
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  phone: String
  type: String
}

type Table {
  _id: ID!
  number: Int!
  capacity: Int!
  status: String!
}

type MenuItem {
  _id: ID!
  name: String!
  description: String
  price: Float!
  categories: [String]!
  imageUrl: String
  isAvailable: Boolean
}

type Booking {
  _id: ID!
  user: User!
  table: Table!
  date: String!
  time: String!
  partySize: Int!
  specialRequests: String
  status: String!
}

type Blog {
  _id: ID!
  title: String!
  content: String!
  author: User
  createdAt: String
}

type contactMessage {
  name: String!
  email: String!
  message: String!
}

type Query {
  getAllUsers: [User!]! 
  getUserById(userId: ID!): User 
  getAllTables: [Table]
  getMenuItemById: MenuItem
  getAllMenuItems(limit: Int, offset: Int,category:String): [MenuItem]
  getAllBookings: [Booking]
  getAllBookingsForUser: [Booking]
  getBookingById: Booking
  getAllBlogs: [Blog!]!
  getBlogById(id: ID!): Blog
  getAllContactMessage: [contactMessage]
}

type Mutation {
  login(email: String!, password: String!): AuthPayload
  createUser(email: String!, password: String!, firstName: String!, lastName: String!, phone: String): User
  editUser(userId: ID!, userInput: UserInput!): User
  deleteUser(userId: ID!): User

  createTable(number: Int!, capacity: Int!, status: String): Table
  editTable(tableId: ID!, tableInput: TableInput!): Table
  deleteTable(tableId: ID!): Table

  createMenuItem(name: String!, description: String, price: Float!, categories: [String]!, imageUrl: String, isAvailable: Boolean): MenuItem
  editMenuItem(menuItemId: ID!, menuItemInput: MenuItemInput!): MenuItem
  deleteMenuItem(menuItemsId:ID!): MenuItem
  
  createBooking(bookingInput: BookingInput!): Booking
  editBooking(bookingId: ID!, bookingInput: BookingInput!): Booking
  deleteBooking(bookingId: ID!): Booking

  sendMessage(ContactUsInput: ContactUsInput!): ContactUsResponse

  createBlog(title: String!, content: String!, author: String!): Blog!
  updateBlog(id: ID!, title: String!, content: String!, author: String!): Blog!
  deleteBlog(id: ID!): ID!
}

type AuthPayload {
  token: String!
  user: User!
}

input UserInput {
  firstName: String
  lastName: String
  phone: String
}

input MenuItemInput {
  name: String
  description: String
  price: String
  categories:[String]
  imageUrl:String
  isAvailable: Boolean
}

input TableInput {
  number: Int
  capacity: Int
  status: String
}

input BookingInput {
  tableId: ID!
  date: String!
  time: String!
  partySize: Int!
  specialRequests: String
  status: String!
}

input ContactUsInput {
  name: String!
  email: String!
  message: String!
}

type ContactUsResponse {
  message: String
}

`;
module.exports = schema;
