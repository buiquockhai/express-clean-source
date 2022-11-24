const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    static className = "Exam";

    static associate(models) {
      Exam.hasMany(models.Room, {
        foreignKey: "exam_id",
      });
    }
  }

  Exam.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      max_point: {
        type: DataTypes.INTEGER,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      level: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      submitted: {
        type: DataTypes.STRING,
      },
      title: {
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
      modelName: "tb_exam",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return Exam;
};
