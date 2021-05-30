import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import cors from 'cors';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen({ port: PORT }, () => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${PORT}
    📭  Query at http://localhost:${PORT}/graphql`);
});
