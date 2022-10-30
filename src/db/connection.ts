import knex from 'knex';
import config from './config';

const connection = knex({
  client: 'postgres',
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
  },
});

export default connection;
