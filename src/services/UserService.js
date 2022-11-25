const model = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { v4 } = require("uuid");
const { JWT_PRIVATE_KEY, ADMIN_ID } = require("../util/constraints");

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

const newUser = async ({ req }) => {
  const config = await model.Configuration.findAll({
    where: {
      deleted: "N",
    },
  });

  if (config) {
    const arrToObject = config.reduce(
      (obj, item) => ({ ...obj, [item.key]: item.value }),
      {}
    );

    let role = null;

    if (req.body.secret_key === arrToObject.teacher_registry_code) {
      role = "teacher";
    }

    if (req.body.secret_key === arrToObject.student_registry_code) {
      role = "student";
    }

    if (role) {
      const result = await model.User.create({
        id: v4(),
        role: role,
        name: req.body.name,
        code: new Date().getTime().toString(),
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        phone: req.body.phone,
        address: req.body.address,
        contact: req.body.contact,
        avatar: req.body.avatar,
        address: req.body.address,
        password: req.body.password,
        created_id: ADMIN_ID,
        updated_id: ADMIN_ID,
        deleted: "N",
      });

      return result;
    }
  }

  return null;
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
