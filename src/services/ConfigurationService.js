const model = require("../models");

const getConfigurations = async ({ req, token }) => {
  const result = await model.Configuration.findAll({
    where: {
      ...req?.params,
      deleted: "N",
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

const updateConfiguration = async ({ req, token }) => {
  const { key, ...rest } = req.body;
  const result = await model.Configuration.update(
    {
      ...rest,
      updated_id: token.id,
    },
    {
      where: { key },
    }
  );
  return result;
};

module.exports = {
  getConfigurations,
  newConfiguration,
  updateConfiguration,
};
