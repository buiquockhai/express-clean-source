const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ViolatingRule extends Model {
    static className = "ViolatingRule";

    static associate(models) {}
  }

  ViolatingRule.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      room_id: {
        type: DataTypes.UUID,
      },
      minus_point: {
        type: DataTypes.INTEGER,
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
      modelName: "tb_violating_rule",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return ViolatingRule;
};
