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
