const ContactMessage = require("../../models/contactUsModel");
const { isAuthorized } = require("../../utils/utils");

const getAllContactMessage = async (_, __, { user }) => {
  isAuthorized(user, "admin");

  return await ContactMessage.find();
};

const sendMessage = async (_, { ContactUsInput }) => {
  const { name, email, message } = ContactUsInput;
  return await ContactMessage.create({ name, email, message });
};
module.exports = { sendMessage, getAllContactMessage };
