const { Op } = require("sequelize");
const model = require("../models");

const getViolatingRules = async ({ req }) => {
  const result = await model.ViolatingRule.findAll({
    where: {
      ...req?.query,
      deleted: "N",
    },
  });
  return result;
};

const getViolatingRuleDetail = async ({ req }) => {
  const result = await model.ViolatingRule.findOne({
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return result;
};

const newViolatingRule = async ({ req, token }) => {
  const result = await model.ViolatingRule.create({
    user_id: req.body.user_id,
    room_id: req.body.room_id,
    minus_point: req.body.minus_point,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

const updateViolatingRule = async ({ req, token }) => {
  const { id, ...rest } = req.body;
  const result = await model.ViolatingRule.update(
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
  getViolatingRules,
  getViolatingRuleDetail,
  newViolatingRule,
  updateViolatingRule,
};
