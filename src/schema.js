import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL's schema language
const typeDefs = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # we can paginate those queries, returning only a set number of results.
  type NoteFeed {
    # a limited amount of notes
    notes: [Note]!
    # representing the last item in the data set
    cursor: String!
    # if there is an additional page of data to query
    hasNextPage: Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    noteFeed(cursor: String): NoteFeed
    note(id: ID!): Note!

    users: [User!]!
    user(username: String!): User
    me: User!
  }

  type Mutation {
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    toggleFavorite(id: ID!): Note!

    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;

export default typeDefs;
