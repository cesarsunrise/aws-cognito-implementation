const Sequelize = require("sequelize");
const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PROXY_HOST,
  MYSQL_PORT,
} = require("../config");

const database = (password = null) => {
  const DBPassword = password;
  const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, DBPassword, {
    host: MYSQL_PROXY_HOST,
    port: MYSQL_PORT,
    logging: false,
    dialect: "mysql",
    dialectOptions: {
      ssl: "Amazon RDS",
      authPlugins: {
        mysql_clear_password: () => () => Buffer.from(DBPassword + "\0"),
      },
    },
  });
  const db = {};
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
};
module.exports = database;
