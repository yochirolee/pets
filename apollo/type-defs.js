import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: Int!
  }

  type Pet {
    id:ID!
    name: String!
    owner_name: String!
    species: String
    age: String
    poddy_trained: Boolean
    diet: String
    image_url: String
    likes: String
    dislikes: String
  }

  input PetInput {
   
    name: String!
    owner_name: String!
    species: String
    age: String
    poddy_trained: Boolean
    diet: String
    image_url: String
    likes: String
    dislikes: String
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type Post {
    body: String
    username: String
  }
  input PostInput {
    body: String!
    username: String!
  }

  type PostPayload {
    post: Post!
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    getPosts: [Post]
    getPets:[Pet]
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    createPost(input: PostInput): Post!
    createPet(input:PetInput):Pet!
  }
`;
