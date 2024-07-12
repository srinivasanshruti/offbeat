export default {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'offbeat',
    password: 'offbeat',
    database: 'offbeat',
    charset: 'utf8',
  },
  migrations: {
    directory: './knex/migrations',
  },  seeds: {
    directory: './knex/seeds',
  },
};
