import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import jwt from "jsonwebtoken";
// import helmet from "helmet";
import cors from "cors";
import db from "./db.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers/index.js";
import models from "./models/index.js";
import depthLimit from "graphql-depth-limit";
import { createComplexityLimitRule } from "graphql-validation-complexity";

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017/notedly";

// Required logic for integrating with Express
const app = express();
// a collection of small security-minded middleware functions
// app.use(helmet());
// To enable Cross-Origin Resource Sharing
app.use(cors());
const httpServer = http.createServer(app);

// Connect to the database
db.connect(DB_HOST);

// get the user info from a JWT
const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET || "YourPassphrase");
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error("Session invalid");
    }
  }
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);
    // for now, let's log the user to the console:
    console.log({ user });
    // add the db models and the user to the context
    return { models, user };
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// More required logic for integrating with Express
await server.start();

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });

httpServer.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
