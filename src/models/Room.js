const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static className = "Room";

    static associate(models) {
      Room.hasMany(models.Mark, {
        foreignKey: "room_id",
      });

      Room.belongsTo(models.Exam, {
        foreignKey: "exam_id",
      });
    }
  }

  Room.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      exam_id: {
        type: DataTypes.UUID,
      },
      exam_title: {
        type: DataTypes.STRING,
      },
      group_id: {
        type: DataTypes.UUID,
      },
      group_title: {
        type: DataTypes.STRING,
      },
      proctor_id: {
        type: DataTypes.UUID,
      },
      proctor_name: {
        type: DataTypes.STRING,
      },
      member_status: {
        type: DataTypes.STRING,
      },
      marked: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATE,
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
      modelName: "tb_room",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return Room;
};
