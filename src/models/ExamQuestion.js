const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExamQuestion extends Model {
    static className = "ExamQuestion";

    static associate(models) {
      ExamQuestion.belongsTo(models.Question, {
        foreignKey: "question_id",
      });
    }
  }

  ExamQuestion.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      exam_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      modelName: "tb_exam_question",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );

  return ExamQuestion;
};
