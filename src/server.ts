import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import cors from 'cors';
import 'dotenv/config';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import LeaderboardSQLDb from './datasources/leaderboard-sql-db';

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.PG_HOST!,
    user: process.env.PG_USER!,
    password: process.env.PG_PASSWORD!,
    database: process.env.PG_DB!,
  },
};

const dataSources = () => ({
  leaderboardSQLDb: new LeaderboardSQLDb(knexConfig),
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen({ port: PORT }, () => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${PORT}
    📭  Query at http://localhost:${PORT}/graphql`);
});
