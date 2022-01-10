import Query from "./query.js";
import Mutation from "./mutation.js";
import { GraphQLDateTime } from "graphql-scalars";

// Provide resolver functions for our schema fields
const resolvers = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime,
};

export default resolvers;
