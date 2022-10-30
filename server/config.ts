interface Config {
  host: string;
  user: string;
  password: string;
  database: string;
}

const defaultConfig: Config = {
  host: '127.0.0.1',
  user: 'todoapp',
  password: 'todoapp',
  database: 'todoapp',
};

const stagingConfig: Config = {
  host: '',
  user: '',
  password: '',
  database: '',
};

const productionConfig: Config = {
  host: '',
  user: '',
  password: '',
  database: '',
};

const config: Config = {
  host: '',
  user: '',
  password: '',
  database: '',
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(config, defaultConfig);
    break;
  case 'staging':
    Object.assign(config, stagingConfig);
    break;
  case 'production':
    Object.assign(config, productionConfig);
    break;
  default:
    Object.assign(config, defaultConfig);
    break;
}

export default config;
