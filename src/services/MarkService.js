const { Op } = require("sequelize");
const model = require("../models");

const getMarks = async ({ req }) => {
  const result = await model.Mark.findAll({
    where: {
      ...req?.query,
      deleted: "N",
    },
    order: [["created_date", "DESC"]],
  });
  return result;
};

const getFullMarks = async ({ req }) => {
  const result = await model.Mark.findAll({
    include: [{ model: model.Room, include: [{ model: model.Exam }] }],
    where: {
      ...req?.query,
      deleted: "N",
    },
    order: [["created_date", "DESC"]],
  });
  return result;
};

const getMarkDetail = async ({ req }) => {
  const result = await model.Mark.findOne({
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return result;
};

const newMark = async ({ req, token }) => {
  const result = await model.Mark.create({
    user_id: req.body.user_id,
    room_id: req.body.room_id,
    mark: req.body.mark,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

const updateMark = async ({ req, token }) => {
  const { id, ...rest } = req.body;
  const result = await model.Mark.update(
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
  getMarks,
  getMarkDetail,
  newMark,
  updateMark,
  getFullMarks,
};
