const model = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
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

const getUserDetail = async ({ req }) => {
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
    order: [["created_date", "DESC"]],
    where: {
      ...req?.query,
      deleted: "N",
    },
  });
  return result;
};

const getFreezeUsers = async () => {
  const result = await model.User.findAll({
    order: [["created_date", "DESC"]],
    where: {
      role: "student",
      group_id: { [Op.eq]: null },
      deleted: "N",
    },
  });
  return result;
};

const updateUser = async ({ req, token }) => {
  const { id, ...rest } = req.body;
  const result = await model.User.update(
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

const changePassword = async ({ req, token }) => {
  const user = await model.User.findOne({
    where: {
      id: token.id,
    },
  });
  if (user.password === req.old_password) {
    const result = await model.User.update(
      {
        password: req.body.new_password,
        updated_id: token.id,
      },
      {
        where: { id: token.id },
      }
    );
    return result;
  }
  return false;
};

const newUser = async ({ req, token }) => {
  const result = await model.User.create({
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
  updateUser,
  newUser,
  changePassword,
  getFreezeUsers,
};
