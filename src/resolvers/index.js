import Query from "./query.js";
import Mutation from "./mutation.js";
import { GraphQLDateTime } from "graphql-scalars";
import Note from "./note.js";
import User from "./user.js";

// Provide resolver functions for our schema fields
const resolvers = {
  Query,
  Mutation,
  Note,
  User,
  DateTime: GraphQLDateTime,
};

export default resolvers;
