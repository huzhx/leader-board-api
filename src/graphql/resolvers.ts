const resolvers = {
  Query: {
    players: async (parent: any, args: any, { dataSources }: { dataSources: any }, info: any) => {
      const players = await dataSources.leaderboardSQLDb.getPlayers();
      return players.map((player: any) => {
        return {
          id: player.player_id,
          name: player.codename,
          team: player.team === 0 ? 'RED' : 'BLUE',
        };
      });
    },
  },
};

export default resolvers;
