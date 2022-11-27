const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRoom extends Model {
    static className = "UserRoom";

    static associate(models) {
      UserRoom.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      UserRoom.belongsTo(models.Room, {
        foreignKey: "room_id",
      });
    }
  }

  UserRoom.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
      },
      verified: {
        type: DataTypes.STRING,
      },
      description: {
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
      modelName: "tb_user_room",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return UserRoom;
};
