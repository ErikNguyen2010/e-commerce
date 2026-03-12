const dev = {
  app: {
    port: process.env.APP_PORT,
  },
  db: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
  },
};

const config = { dev };

const env = process.env.ENV;

module.exports = config[env];
