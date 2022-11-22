const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");

const getResults = async ({ req }) => {
  const result = await model.Result.findAll({
    where: {
      ...req?.query,
      deleted: "N",
    },
    order: [["created_date", "DESC"]],
  });
  return result;
};

const getResultDetail = async ({ req }) => {
  const result = await model.Result.findOne({
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return result;
};

const newResult = async ({ req, token }) => {
  const result = await model.Result.create({
    id: v4(),
    room_id: req.body.room_id,
    selected_answer_id: req.body.selected_answer_id,
    answer_content: req.body.answer_content,
    answer_images: req.body.answer_images,
    question_id: req.body.question_id,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

const updateResult = async ({ req, token }) => {
  const { id, ...rest } = req.body;
  const result = await model.Result.update(
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
  getResults,
  getResultDetail,
  newResult,
  updateResult,
};
