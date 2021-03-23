import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { createUser, findUser, validatePassword } from "../lib/user";
import { setLoginSession, getLoginSession } from "../lib/auth";
import { removeTokenCookie } from "../lib/auth-cookies";

import Post from "../mongo/models/Post";
import Pet from '../mongo/models/Pet';

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req);

        if (session) {
          return findUser({ email: session.email });
        }
      } catch (error) {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        );
      }
    },

    getPosts: async () => {
      
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new err();
      }
    },

    getPets: async () => {
      
      try {
        const pets = await Pet.find().sort({ createdAt: -1 });
        return pets;
      } catch (err) {
        throw new err();
      }
    },
  },

  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = await createUser(args.input);
      return { user };
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ email: args.input.email });

      if (user && (await validatePassword(user, args.input.password))) {
        const session = {
          id: user.id,
          email: user.email,
        };

        await setLoginSession(context.res, session);

        return { user };
      }

      throw new UserInputError("Invalid email and password combination");
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res);
      return true;
    },

    createPost: async (_, args, context) => {
      const { username, body } = args.input;
      const newPost = new Post({
        body,
        username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return await newPost.save();
    },

    createPet: async (_, args, context) => {
      const { 
        name,
        owner_name,
        species,
        age,
        poddy_trained,
        diet,
        image_url,
        likes,
        dislikes
      } = args.input;

      const newPet = new Pet({
        name,
        owner_name,
        species,
        age,
        poddy_trained,
        diet,
        image_url,
        likes,
        dislikes
      });
      return await newPet.save();
    },
  },
};
