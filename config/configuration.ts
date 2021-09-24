export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    // For a sync connection (forRoot)

    // client: process.env.DB_CLIENT,
    // debug: false,
    // connection: {
    //   host: process.env.DATABASE_HOST,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   port: parseInt(process.env.DB_PORT, 10) || 1433,
    //   options: {
    //     encrypt: false,
    //   },
    // },

    // For a async connection (forRootAsync)
    type: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) | 1433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: ['dist/**/**/*.entity{.ts,.js}'],
    options: {
      encrypt: false,
    },
  },

  tenancyTemplate: {
    type: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) | 1433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: false,
    entities: ['dist/**/**/*.entity{.ts,.js}'],
    options: {
      encrypt: false,
    },
  },

  tenancyDbNames: {
    bselscript: process.env.BSELSCRIPT_DB_NAME,
    elal: process.env.ELAL_DB_NAME,
    sheba: process.env.SHEBA_DB_NAME,
    intel: process.env.INTEL_DB_NAME,
  },

  lang: {
    fallbackLanguage: 'en',
  },
});
