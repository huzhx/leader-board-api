import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Player {
    id: ID!
    name: String!
    team: TeamCode!
  }

  enum TeamCode {
    RED
    BLUE
  }

  type Query {
    players: [Player]
  }
`;

export default typeDefs;
