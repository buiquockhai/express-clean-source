const model = require("../models");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
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

const getUserDetail = async ({ _, token }) => {
  const result = await model.User.findOne({
    where: { id: token.id, deleted: "N" },
  });
  return result;
};

const getForceUserDetail = async ({ req }) => {
  const result = await model.User.findOne({
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return result;
};

const getUsers = async ({ req }) => {
  const result = await model.User.findAll({
    where: {
      ...req?.params,
      deleted: "N",
    },
  });
  return result;
};

const updateUser = async ({ req, token }) => {
  const result = await model.User.update({
    ...req.body,
    updated_id: token.id,
  });
  return result;
};

const changePassword = async ({ req, token }) => {
  const result = await model.User.update({
    password: req.body.password,
    updated_id: token.id,
  });
  return result;
};

const newUser = async ({ req, token }) => {
  const result = await model.User.update({
    id: v4(),
    role: req.body.role,
    name: req.body.name,
    code: req.body.code,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    group_id: req.body.group_id,
    group_title: req.body.group_title,
    phone: req.body.phone,
    address: req.body.address,
    contact: req.body.contact,
    avatar: req.body.avatar,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

module.exports = {
  getToken,
  getUsers,
  getUserDetail,
  getForceUserDetail,
  updateUser,
  newUser,
  changePassword,
};
