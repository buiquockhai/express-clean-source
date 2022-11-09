const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const { PG_CONFIG } = require("../util/constraints");

require("pg").types.setTypeParser(1114, (stringValue) => {
  return new Date(
    stringValue.substring(0, 10) + "T" + stringValue.substring(11) + "Z"
  );
});

const sequelize = new Sequelize(
  PG_CONFIG.database,
  PG_CONFIG.username,
  PG_CONFIG.password,
  PG_CONFIG
);

const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.className] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
