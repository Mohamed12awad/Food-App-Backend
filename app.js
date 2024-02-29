require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { authMiddleware } = require("./utils/authController");

// graphql Configration
const root = require("./graphql/resolvers/index");
const schema = require("./graphql/schema/index");
const { ApolloServer, gql } = require("apollo-server-express");

const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers: root,
  context: async ({ req, res }) => {
    const user = await authMiddleware(req, res);
    return { req, res, user };
  },
});

const app = express();
app.use(cookieParser());
app.use(express.json());

// cors roles
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

mongoose
  .connect(process.env.DB_URI)
  .then(() => startServer())
  .then((res) => app.listen(process.env.SERVER_PORT))
  .catch((err) => console.log(err));

/* -------------------------------- */

// to be done
// user image + send email upon reqister to verify user
// authintication and authorization ----- done
// notifiacion for admin panal ----"Subscriptions in Apollo Server"
