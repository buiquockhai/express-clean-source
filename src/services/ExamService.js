const { v4 } = require("uuid");
const model = require("../models");

const getExams = async ({ req }) => {
  const result = await model.Exam.findAll({
    where: {
      ...req?.params,
      deleted: "N",
    },
  });
  return result;
};

const getExamDetail = async ({ req }) => {
  const result = await model.Exam.findOne({
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return result;
};

const newExam = async ({ req, token }) => {
  const result = await model.Exam.create({
    id: v4(),
    max_point: req.body.max_point,
    duration: req.body.duration,
    level: req.body.level,
    status: req.body.status,
    title: req.body.title,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

const updateExam = async ({ req, token }) => {
  const { id, ...rest } = req.body;
  const result = await model.Exam.update(
    {
      ...rest,
      updated_id: token.id,
    },
    {
      where: { id },
    }
  );
  return result;
};

module.exports = {
  getExams,
  getExamDetail,
  newExam,
  updateExam,
};
