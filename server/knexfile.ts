import config from './config';

const CLIENT = 'postgres';
const DIRECTORY = './src/db/migrations';

interface KnexFile {
  development: {
    client: string;
    connection: {
      database: string;
      user: string;
      password: string;
    };
    migrations: {
      directory: string;
      tableName: string;
    };
  };
  staging: {
    client: string;
    connection: {
      database: string;
      user: string;
      password: string;
    };
    pool: {
      min: 2;
      max: 10;
    };
    migrations: {
      directory: string;
      tableName: string;
    };
  };
  production: {
    client: string;
    connection: {
      database: string;
      user: string;
      password: string;
    };
    pool: {
      min: 2;
      max: 10;
    };
    migrations: {
      directory: string;
      tableName: string;
    };
  };
}

const knexfile: KnexFile = {
  development: {
    client: CLIENT,
    connection: {
      database: config.database,
      user: config.user,
      password: config.password,
    },
    migrations: {
      directory: DIRECTORY,
      tableName: 'knex_migrations',
    },
  },
  staging: {
    client: CLIENT,
    connection: {
      database: config.database,
      user: config.user,
      password: config.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: DIRECTORY,
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: CLIENT,
    connection: {
      database: config.database,
      user: config.user,
      password: config.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: DIRECTORY,
      tableName: 'knex_migrations',
    },
  },
};

module.exports = knexfile;
