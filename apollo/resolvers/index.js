const PostResolvers=require('./post')
const UserResolvers=require('./user')
const CommentResolvers=require('./comment')


module.exports={
    Query:{
        ...PostResolvers.Query,
        ...UserResolvers.Query,
        ...CommentResolvers.Query,
    },
    Mutation:{
        ...PostResolvers.Mutation,
        ...UserResolvers.Mutation,
        ...CommentResolvers.Mutation,
    }
}