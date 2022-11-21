const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static className = "Result";

    static associate(models) {
      Result.belongsTo(models.User, {
        foreignKey: "created_id",
      });

      Result.belongsTo(models.Question, {
        foreignKey: "question_id",
      });
    }
  }

  Result.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.UUID,
      },
      selected_answer_id: {
        type: DataTypes.UUID,
      },
      question_id: {
        type: DataTypes.UUID,
      },
      selected_answer_label: {
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
      modelName: "tb_result",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return Result;
};
