const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static className = "Notification";

    static associate(models) {}
  }

  Notification.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
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
      modelName: "tb_notification",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return Notification;
};
