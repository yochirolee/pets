const { AuthenticationError } = require("apollo-server");
const { findById } = require("../../models/Post");
const Post = require("../../models/Post");
const isAuth = require("../../utils/auth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new err();
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await posts.findById(postId);
        if (post) return post;
        else throw new Error(err);
      } catch (err){
        throw new Error(err)
      }
    },
  },
  Mutation: {
    newPost: async (_, { body }, context) => {
      const user = isAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      return await newPost.save();
    },

    deletePostById: async (_, { postId }, context) => {
      const user = isAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await Post.deleteOne();
          return "Post successfully deleted";
        } else {
          throw new AuthenticationError("Action is not Allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
