const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");

const getGroups = async ({ req }) => {
  const result = await model.Group.findAll({
    where: {
      ...req?.query,
      deleted: "N",
    },
    order: [["created_date", "DESC"]],
  });
  return result;
};

const getGroupDetail = async ({ req }) => {
  const result = await model.Group.findOne({
    include: [{ model: model.User, where: { deleted: "N" } }],
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return result;
};

const newGroup = async ({ req, token }) => {
  const newId = v4();
  const result = await model.Group.create({
    id: newId,
    code: req.body.code,
    title: req.body.title,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });

  if (result) {
    await model.User.update(
      {
        group_id: newId,
        group_title: req.body.title,
        updated_id: token.id,
      },
      {
        where: {
          id: { [Op.in]: req.body.users },
        },
      }
    );
  }

  return result;
};

const updateGroup = async ({ req, token }) => {
  const { id, users, ...rest } = req.body;
  const result = await model.Group.update(
    {
      ...rest,
      updated_id: token.id,
    },
    {
      where: { id: { [Op.in]: [id].flat() } },
    }
  );

  if (Array.isArray(users)) {
    await model.User.update(
      {
        group_id: null,
        group_title: "",
        updated_id: token.id,
      },
      {
        where: {
          group_id: id,
        },
      }
    );
    await model.User.update(
      {
        group_id: id,
        group_title: req.body.title,
        updated_id: token.id,
      },
      {
        where: {
          id: { [Op.in]: req.body.users },
        },
      }
    );
  }

  return result;
};

module.exports = {
  getGroups,
  newGroup,
  updateGroup,
  getGroupDetail,
};
