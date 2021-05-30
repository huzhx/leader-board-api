import { SQLDataSource } from 'datasource-sql';

const MINUTE = 60;

class LeaderboardSQLDb extends SQLDataSource {
  constructor(config: any) {
    super(config);
  }
  getPlayers() {
    return this.knex.select('*').from('players').cache(MINUTE);
  }
}

export default LeaderboardSQLDb;
