import typeDefs from '../graphql/schema';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

describe('query players', () => {
  const mockPlayers = [
    { id: '1', name: 'Hello', team: 'RED' },
    { id: '2', name: 'Hello', team: 'BLUE' },
  ];

  const mockResolvers = {
    Query: {
      players: () => {
        return mockPlayers;
      },
    },
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers: mockResolvers });
  const query = `{
    players: players {
      name
    }
  }`;

  it('returns all players', async () => {
    const result = await graphql(schema, query);
    expect(result.errors).toBeUndefined();
    expect(result.data?.players.length).toBe(2);
    expect(result.data?.players).toEqual([{ name: 'Hello' }, { name: 'Hello' }]);
  });
});

describe('query playersPointsForLastHour', () => {
  const mockPlayers = [
    { id: 1, name: 'NumberOne', team: 'RED' },
    { id: 2, name: 'KevinBacon', team: 'BLUE' },
  ];
  const mockActivities = [
    { playerId: 1, timestamp: 1609498800, points: 1803 },
    { playerId: 2, timestamp: 1609495200, points: 1436 },
    { playerId: 2, timestamp: 1609498800, points: 4675 },
  ];
  const mockCurrentTime = 1609498800;
  const mockResolvers = {
    Query: {
      playersActivitiesForLastHour: () => {
        const idToPlayer = new Map();
        for (let mockPlayer of mockPlayers) {
          idToPlayer.set(mockPlayer.id, {
            ...mockPlayer,
            ...{ numOfActivities: 0 },
            ...{ totalPoints: 0 },
            ...{ activities: [] },
          });
        }
        for (let mockActivity of mockActivities) {
          const { playerId, timestamp, points } = mockActivity;
          if (timestamp >= mockCurrentTime - 3600 && timestamp <= mockCurrentTime) {
            const player = idToPlayer.get(playerId);
            player.numOfActivities++;
            player.totalPoints += points;
            player.activities.push(mockActivity);
          }
        }
        const output: any[] = [];
        idToPlayer.forEach((player) => {
          output.push(player);
        });
        return output;
      },
    },
  };
  const schema = makeExecutableSchema({ typeDefs, resolvers: mockResolvers });
  const query = `{
    playersActivitiesForLastHour: playersActivitiesForLastHour {
      name
      numOfActivities
      totalPoints
    }
  }`;
  it('returns players total points and number of activties during the past hour', async () => {
    const result = await graphql(schema, query);
    expect(result.errors).toBeUndefined();
    expect(result.data?.playersActivitiesForLastHour.length).toBe(2);
    expect(result.data?.playersActivitiesForLastHour).toEqual([
      { name: 'NumberOne', numOfActivities: 1, totalPoints: 1803 },
      { name: 'KevinBacon', numOfActivities: 2, totalPoints: 6111 },
    ]);
  });
});
