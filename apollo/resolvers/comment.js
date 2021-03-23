const { AuthenticationError,UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const isAuth = require("../../utils/auth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = isAuth(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          let comment = {
            body,
            username,
            createdAt: new Date().toISOString(),
          };
          await post.comments.push(comment);
        }
        return post.save();
      } catch (error) {
        throw new Error("No Post Found");
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = isAuth(context);
      const post = await Post.findById(postId);
      
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
       
        if (commentIndex>=0 && post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },

    likePost:async(_,{postId},context)=>{
      const {username}=isAuth(context);

      const post =await Post.findById(postId);
      if(post){
        if(post.likes.find(like=>like.username===username))
        {
          post.likes=post.likes.filter(like=>like.username!==username);
          await post.save();
        }
        else{
          //Not liket post
          post.likes.push({
            username,
            createdAt:new Date().toISOString()
          })
        }
        await post.save();
        return post;
      
      }
      else{
        return new UserInputError('Post not found');
      }

    }
  },
};
