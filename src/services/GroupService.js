const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");

const getGroups = async ({ req }) => {
  const result = await model.Group.findAll({
    where: {
      ...req?.params,
      deleted: "N",
    },
  });
  return result;
};

const newGroup = async ({ req, token }) => {
  const result = await model.Group.create({
    id: v4(),
    code: req.body.code,
    title: req.body.duration,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

const updateGroup = async ({ req, token }) => {
  const { id, ...rest } = req.body;
  const result = await model.Group.update(
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
  getGroups,
  newGroup,
  updateGroup,
};
