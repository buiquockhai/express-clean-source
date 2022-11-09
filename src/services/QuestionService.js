const { uuid } = require("uuidv4");
const model = require("../models");

const getQuestions = async ({ req, token }) => {
  const result = await model.Question.findAll({
    logging: console.log,
    include: [{ model: model.Folder, as: "folders" }],
    where: {
      deleted: "N",
      ...req?.params,
      created_id: token.id,
    },
  });
  return result;
};

const getQuestionDetail = async ({ req }) => {
  const result = await model.Question.findOne({
    where: {
      deleted: "N",
      ...req.params,
    },
  });
  return result;
};

const getFolders = async ({ req, token }) => {
  console.log("======================================================");
  const result = await model.Folder.findAll({
    // where: {
    //   deleted: "N",
    //   // ...req?.params,
    //   created_id: token.id,
    // },
  });
  return result;
};

const newFolder = async ({ req }) => {
  const { name } = req.body;
  const result = await model.Folder.create({
    id: uuid(),
    name: name,
  });
  return result;
};

const updateFolder = async ({ req }) => {
  const result = await model.Folder.update({
    ...req.body,
  });
  return result;
};

module.exports = {
  getQuestions,
  getQuestionDetail,
  newFolder,
  getFolders,
  updateFolder,
};
