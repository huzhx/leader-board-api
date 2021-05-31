import { mockCurrentTimeInJan2021 } from '../utils/time-helper';

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

    playersActivitiesForLastHour: async (parent: any, args: any, { dataSources }: { dataSources: any }, info: any) => {
      const mockCurrentTime = mockCurrentTimeInJan2021();
      const players = await dataSources.leaderboardSQLDb.getPlayers();
      const activities = await dataSources.leaderboardSQLDb.getPalyersActivitiesForLastHour(mockCurrentTime);
      const idToPlayer = new Map();
      for (let player of players) {
        idToPlayer.set(player.player_id, {
          ...{ id: player.player_id, name: player.codename, team: player.team === 0 ? 'RED' : 'BLUE' },
          ...{ numOfActivities: 0 },
          ...{ totalPoints: 0 },
          ...{ activities: [] },
        });
      }
      for (let activity of activities) {
        const { player_id, hour_timestamp, points } = activity;
        const player = idToPlayer.get(player_id);
        player.numOfActivities++;
        player.totalPoints += points;
        player.activities.push(activity);
      }
      const output: any[] = [];
      idToPlayer.forEach((player) => {
        output.push(player);
      });
      return output.sort((a, b) => b.totalPoints - a.totalPoints);
    },
  },
};

export default resolvers;
