import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import dbConnect from  '../../mongo/dbConnect'

const apolloServer = new ApolloServer({
  schema,
  context:async()=>{
    dbConnect();
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
