const { v4 } = require("uuid");
const model = require("../models");

const getExams = async ({ req, token }) => {
  const result = await model.Exam.findAll({
    where: {
      ...req?.params,
      deleted: "N",
      created_id: token.id,
    },
  });
  return result;
};

const getExamDetail = async ({ req, token }) => {
  const result = await model.Exam.findOne({
    where: {
      ...req.params,
      deleted: "N",
      updated_id: token.id,
    },
  });
  return result;
};

const newExam = async ({ req, token }) => {
  const result = await model.Folder.create({
    id: v4(),
    name: req.body.name,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

module.exports = {
  getExams,
  getExamDetail,
  newExam,
};
