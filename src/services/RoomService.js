const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");
const { socketInstance } = require("../socket/instance");
const { SocketListener } = require("../socket/keys");

const getRooms = async ({ req }) => {
  const result = await model.Room.findAll({
    order: [["created_date", "DESC"]],
    where: {
      ...req?.query,
      deleted: "N",
    },
  });
  return result;
};

const getRoomDetail = async ({ req }) => {
  const result = await model.Room.findOne({
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return result;
};

const newRoom = async ({ req, token }) => {
  const result = await model.Room.create({
    id: v4(),
    status: req.body.status,
    title: req.body.title,
    exam_id: req.body.exam_id,
    exam_title: req.body.exam_title,
    group_id: req.body.group_id,
    group_title: req.body.group_title,
    proctor_id: req.body.proctor_id,
    proctor_name: req.body.proctor_name,
    start_date: req.body.start_date,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

const updateRoom = async ({ req, token }) => {
  const { id, ...rest } = req.body;
  const result = await model.Room.update(
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

const verifyTeacherJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.id,
    },
  });

  if (persist?.proctor_id === token.id) {
    await model.Room.update(
      {
        status: "1",
      },
      {
        where: {
          id: persist?.id,
        },
      }
    );

    return persist;
  }

  return false;
};

const verifyStudentJoinRoom = async ({ req }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.id,
    },
  });

  return persist?.group_id === req.body.group_id ? persist : false;
};

module.exports = {
  getRooms,
  getRoomDetail,
  newRoom,
  updateRoom,
  verifyTeacherJoinRoom,
  verifyStudentJoinRoom,
};
