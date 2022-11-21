const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static className = "Question";

    static associate(models) {
      Question.belongsTo(models.Folder, {
        foreignKey: "folder_id",
      });

      Question.hasMany(models.Answer, {
        foreignKey: "question_id",
      });

      Question.hasMany(models.Result, {
        foreignKey: "question_id",
      });
    }
  }

  Question.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      level: {
        type: DataTypes.STRING,
      },
      point: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.STRING,
      },
      folder_id: {
        type: DataTypes.UUID,
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
      modelName: "tb_question",
      freezeTableName: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      timestamps: true,
    }
  );
  return Question;
};
