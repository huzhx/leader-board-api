import { SQLDataSource } from 'datasource-sql';

const MINUTE = 60;

class LeaderboardSQLDb extends SQLDataSource {
  constructor(config: any) {
    super(config);
  }
  getPlayers() {
    return this.knex.select('*').from('players').cache(MINUTE);
  }
  getPalyersActivitiesForLastHour(currentTime: number) {
    return this.knex
      .select('*')
      .from('player_activities')
      .whereBetween('hour_timestamp', [currentTime - 3600, currentTime]);
  }
}

export default LeaderboardSQLDb;
