const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    static className = "Mark";

    static associate(models) {}
  }

  Mark.init(
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
      mark: {
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
      modelName: "tb_mark",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return Mark;
};
