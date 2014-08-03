module.exports = {
  development:  {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'likalytics_dev',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'database_migrations'
    },
    debug: true
  }
};
