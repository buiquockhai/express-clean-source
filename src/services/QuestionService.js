const { v4 } = require("uuid");
const model = require("../models");

const getQuestions = async ({ req, token }) => {
  const result = await model.Question.findAll({
    logging: console.log,
    // include: [{ model: model.Folder, as: "folders" }],
    where: {
      ...req?.params,
      deleted: "N",
      created_id: token.id,
    },
  });
  return result;
};

const getQuestionDetail = async ({ req, token }) => {
  const result = await model.Question.findOne({
    where: {
      ...req.params,
      deleted: "N",
      updated_id: token.id,
    },
  });
  return result;
};

const getFolders = async ({ req, token }) => {
  const result = await model.Folder.findAll({
    logging: console.log,
    include: [{ model: model.Question, as: "questions" }],
    where: {
      ...req?.params,
      deleted: "N",
      created_id: token.id,
    },
  });
  return result;
};

const newFolder = async ({ req, token }) => {
  const { name } = req.body;
  const result = await model.Folder.create({
    id: v4(),
    name: name,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

const newQuestion = async ({ req, token }) => {
  const result = await model.Question.create({
    id: v4(),
    type: req.body.type,
    level: req.body.level,
    point: req.body.point,
    title: req.body.title,
    content: req.body.content,
    images: req.body.images ?? null,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

const updateFolder = async ({ req, token }) => {
  const result = await model.Folder.update({
    ...req.body,
    created_id: token.id,
    updated_id: token.id,
  });
  return result;
};

const updateQuestion = async ({ req, token }) => {
  const result = await model.Question.update({
    ...req.body,
    created_id: token.id,
    updated_id: token.id,
  });
  return result;
};

module.exports = {
  getQuestions,
  getQuestionDetail,
  newFolder,
  getFolders,
  updateFolder,
  newQuestion,
  updateQuestion,
};
