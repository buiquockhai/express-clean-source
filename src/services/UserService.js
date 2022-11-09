const model = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../util/constraints");

const getToken = async ({ req }) => {
  const { username, password } = req.body;
  const result = await model.User.findOne({
    where: {
      username: username,
      password: password,
    },
  });
  if (result) {
    const token = jwt.sign(
      {
        role: result?.role,
        id: result?.id,
        name: result?.name,
        code: result?.code,
        username: result?.username,
        avatar: result?.avatar,
      },
      JWT_PRIVATE_KEY
    );
    return token;
  }

  return null;
};

const getUser = async ({ res }) => {
  const result = await model.User.findOne({
    where: res?.params ?? {},
  });
  return result;
};

module.exports = {
  getToken,
  getUser,
};
