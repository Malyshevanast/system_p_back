// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "3.80.219.61",
      database: "malysheva",
      user: "malysheva",
      password: "HxWE!ZWU}Xf]26>^",
    },
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "malysheva",
  //     user: "malysheva",
  //     password: "HxWE!ZWU}Xf]26>^",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "malysheva",
  //     user: "malysheva",
  //     password: "HxWE!ZWU}Xf]26>^",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
};
