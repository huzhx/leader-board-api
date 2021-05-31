import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Player {
    id: ID!
    name: String!
    team: TeamCode!
    numOfActivities: Int!
    totalPoints: Int!
    activities: [Activity]
  }

  enum TeamCode {
    RED
    BLUE
  }

  type Activity {
    timestamp: Int!
    point: Int!
  }

  type Query {
    players: [Player]
    playersActivitiesForLastHour: [Player]
  }
`;

export default typeDefs;
