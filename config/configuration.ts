export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    client: process.env.DB_CLIENT,
    debug: false,
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10) || 1433,
      options: {
        encrypt: false,
      },
    },
  },
});
