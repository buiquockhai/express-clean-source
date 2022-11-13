const model = require("../models");

const getConfigurations = async ({ req, token }) => {
  const result = await model.Configuration.findAll({
    where: {
      ...req?.params,
      deleted: "N",
      created_id: token.id,
    },
  });
  return result;
};

const newConfiguration = async ({ req, token }) => {
  const result = await model.Configuration.create({
    key: req.body.key,
    value: req.body.value,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

module.exports = {
  getConfigurations,
  newConfiguration,
};
