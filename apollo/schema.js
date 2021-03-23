import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from './type-defs'
import { resolvers } from '../apollo/resolvers'


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
