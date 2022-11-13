const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static className = "Answer";

    static associate(models) {
      Answer.belongsTo(models.Question, {
        foreignKey: "question_id",
        as: "question",
      });
    }
  }

  Answer.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
      },
      question_id: {
        type: DataTypes.UUID,
      },
      percent: {
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
    },
    {
      sequelize,
      modelName: "tb_answer",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return Answer;
};
