const model = require("../models");
const { socketInstance } = require("../socket/instance");
const { SocketEmitter } = require("../socket/keys");

const getUserRooms = async ({ req }) => {
  const result = await model.UserRoom.findAll({
    order: [["created_date", "DESC"]],
    include: [
      { model: model.User, required: false, where: { deleted: "N" } },
      { model: model.Room, required: false, where: { deleted: "N" } },
    ],
    where: {
      ...req?.query,
      deleted: "N",
    },
  });

  return result;
};

const getUserRoomById = async ({ req }) => {
  const result = await model.UserRoom.findOne({
    order: [["created_date", "DESC"]],
    include: [{ model: model.User, required: false, where: { deleted: "N" } }],
    where: {
      ...req?.query,
      deleted: "N",
    },
  });

  return result;
};

const teacherAuthStudent = async ({ req, token }) => {
  const result = await model.UserRoom.update(
    {
      verified: req.body.verified,
      updated_id: token.id,
    },
    {
      where: {
        room_id: req.body.room_id,
        user_id: req.body.user_id,
      },
    }
  );

  socketInstance.getIO().emit(SocketEmitter.serverFeedbackTeacherAuth, {
    studentId: req.body.user_id,
    verified: req.body.verified,
  });

  return result;
};

const kickOutRoom = async ({ req, token }) => {
  const persist = await model.UserRoom.findOne({
    where: {
      room_id: req.body.room_id,
      user_id: req.body.user_id,
    },
  });

  if (persist.id) {
    const status = persist.status === "3" ? "3" : "0";

    await model.UserRoom.update(
      {
        status: status,
        updated_id: token.id,
      },
      {
        where: {
          room_id: req.body.room_id,
          user_id: req.body.user_id,
        },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackKickOut, {
      studentId: req.body.user_id,
      verified: req.body.verified,
    });

    return persist;
  }

  return null;
};

const verifyLoadRoom = async ({ req, token }) => {
  if (req.body.role === "student") {
    const userInRoom = await model.UserRoom.findOne({
      include: [
        { model: model.Room, required: false, where: { deleted: "N" } },
      ],
      where: {
        user_id: token.id,
        room_id: req.body.room_id,
      },
    });

    return userInRoom?.status === "2" && userInRoom?.tb_room?.status === "1";
  } else {
    const room = await model.Room.findOne({
      include: [
        { model: model.Room, required: false, where: { deleted: "N" } },
      ],
      where: {
        proctor_id: token.id,
        id: req.body.room_id,
      },
    });

    return room?.proctor_id === token.id && userInRoom?.tb_room?.status !== "2";
  }
};

module.exports = {
  getUserRooms,
  getUserRoomById,
  teacherAuthStudent,
  kickOutRoom,
  verifyLoadRoom,
};
