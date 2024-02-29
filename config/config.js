module.exports.config = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DIALECT,
    timezone: process.env.DB_TIMEZONE,
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DIALECT,
    timezone: process.env.DB_TIMEZONE,
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_DB_HOST,
    dialect: process.env.PROD_DIALECT,
    timezone: process.env.DB_TIMEZONE,
  },
};
