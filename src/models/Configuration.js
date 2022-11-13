const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Configuration extends Model {
    static className = "Configuration";

    static associate(models) {}
  }

  Configuration.init(
    {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
      },
      created_date: {
        type: DataTypes.DATE,
      },
      created_id: {
        type: DataTypes.UUID,
      },
      updated_date: {
        type: DataTypes.DATE,
      },
      updated_id: {
        type: DataTypes.UUID,
      },
      deleted: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "tb_config",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return Configuration;
};
