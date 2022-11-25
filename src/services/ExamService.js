const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");

const getExams = async ({ req }) => {
  const result = await model.Exam.findAll({
    where: {
      ...req?.query,
      deleted: "N",
    },
    order: [["created_date", "DESC"]],
  });
  return result;
};

const getExamDetail = async ({ req }) => {
  const questionBelongToExam = await model.ExamQuestion.findAll({
    where: {
      exam_id: req.params.id,
      deleted: "N",
    },
  });

  const questionIds = questionBelongToExam.map((item) => item.question_id);

  const questionList = await model.Question.findAll({
    include: [
      { model: model.Folder, required: false, where: { deleted: "N" } },
      { model: model.Answer, required: false, where: { deleted: "N" } },
    ],
    where: {
      id: { [Op.in]: questionIds },
      deleted: "N",
    },
  });

  const exam = await model.Exam.findOne({
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return { exam, questionList };
};

const newExam = async ({ req, token }) => {
  const newId = v4();
  const result = await model.Exam.create({
    id: newId,
    max_point: req.body.max_point,
    duration: req.body.duration,
    level: req.body.level,
    status: req.body.status,
    title: req.body.title,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });

  if (result) {
    (req.body.questions ?? []).forEach(async (item) => {
      await model.ExamQuestion.create({
        id: v4(),
        question_id: item,
        exam_id: newId,
        created_id: token.id,
        updated_id: token.id,
        deleted: "N",
      });
    });
  }

  return result;
};

const updateExam = async ({ req, token }) => {
  const { id, questions, ...rest } = req.body;
  const result = await model.Exam.update(
    {
      ...rest,
      updated_id: token.id,
    },
    {
      where: { id: { [Op.in]: [id].flat() } },
    }
  );

  if (Array.isArray(questions) && questions.length > 0) {
    await model.ExamQuestion.update(
      {
        updated_id: token.id,
        deleted: "Y",
      },
      { where: { exam_id: id } }
    );

    questions.forEach(async (item) => {
      await model.ExamQuestion.create({
        id: v4(),
        question_id: item,
        exam_id: id,
        created_id: token.id,
        updated_id: token.id,
        deleted: "N",
      });
    });
  }

  return result;
};

module.exports = {
  getExams,
  getExamDetail,
  newExam,
  updateExam,
};
