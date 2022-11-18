const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");

const getQuestions = async ({ req }) => {
  const result = await model.Question.findAll({
    // logging: console.log,
    include: [{ model: model.Folder }, { model: model.Answer }],
    where: {
      ...req?.query,
      deleted: "N",
    },
  });
  return result;
};

const getQuestionDetail = async ({ req }) => {
  const result = await model.Question.findOne({
    include: [{ model: model.Folder }, { model: model.Answer }],
    where: {
      ...req.params,
      deleted: "N",
    },
  });
  return result;
};

const getFolders = async ({ req }) => {
  const result = await model.Folder.findAll({
    include: [{ model: model.Question }],
    where: {
      ...req?.query,
      deleted: "N",
    },
  });
  return result;
};

const getTree = async ({ _, token }) => {
  const parents = await model.Folder.findAll({
    include: [{ model: model.Question }],
    where: {
      created_id: token.id,
      deleted: "N",
    },
  });
  const aloneLeafs = await model.Question.findAll({
    where: {
      folder_id: null,
      created_id: token.id,
      deleted: "N",
    },
  });
  return { parents, aloneLeafs };
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
  const { id, ...rest } = req.body;
  const result = await model.Folder.update(
    {
      ...rest,
      updated_id: token.id,
    },
    {
      where: { id: { [Op.in]: [id].flat() } },
    }
  );
  return result;
};

const updateQuestion = async ({ req, token }) => {
  const { id, ...rest } = req.body;
  const result = await model.Question.update(
    {
      ...rest,
      updated_id: token.id,
    },
    {
      where: { id: { [Op.in]: [id].flat() } },
    }
  );
  return result;
};

module.exports = {
  getQuestions,
  getQuestionDetail,
  getTree,
  newFolder,
  getFolders,
  updateFolder,
  newQuestion,
  updateQuestion,
};
