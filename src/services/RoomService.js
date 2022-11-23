const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");
const { socketInstance } = require("../socket/instance");
const { SocketEmitter } = require("../socket/keys");

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
        updated_id: token.id,
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

const verifyStudentJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
    },
  });

  if (persist?.group_id === req.body.group_id && persist.status === "1") {
    const memberStatus = persist?.member_status ?? "";

    const object = memberStatus.length > 0 ? JSON.parse(memberStatus) : {};
    const updateObject = {
      ...object,
      [token.id]: "1",
    };

    await model.Room.update(
      {
        member_status: JSON.stringify(updateObject),
      },
      {
        where: {
          id: persist?.id,
        },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackJoinRoom, {
      roomId: req.body.room_id,
      groupId: req.body.group_id,
      userId: token.id,
      proctorId: persist.proctor_id,
    });

    return persist;
  }

  return false;
};

const teacherAcceptRequestJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
    },
  });

  if (persist?.id) {
    const object = persist?.member_status
      ? JSON.parse(persist.member_status)
      : {};

    const updatedObject = {
      ...object,
      [req.body.student_id]: "2",
    };

    await model.Room.update(
      {
        member_status: JSON.stringify(updatedObject),
        updated_id: token.id,
      },
      {
        where: { id: persist?.id },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackAcceptJoinRoom, {
      studentId: req.body.student_id,
      proctorId: persist?.proctor_id,
      roomId: persist?.id,
    });
  }

  return persist;
};

const teacherRejectRequestJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
    },
  });

  if (persist?.id) {
    const object = persist?.member_status
      ? JSON.parse(persist.member_status)
      : {};

    const updatedObject = {
      ...object,
      [req.body.student_id]: "0",
    };

    await model.Room.update(
      {
        member_status: JSON.stringify(updatedObject),
        updated_id: token.id,
      },
      {
        where: { id: persist?.id },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackRejectJoinRoom, {
      studentId: req.body.student_id,
      proctorId: persist?.proctor_id,
      roomId: persist?.id,
    });
  }

  return persist;
};

const studentCancelRequestJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
    },
  });

  if (persist?.id) {
    const object = persist?.member_status
      ? JSON.parse(persist.member_status)
      : {};

    const updatedObject = {
      ...object,
      [req.body.student_id]: "0",
    };

    await model.Room.update(
      {
        member_status: JSON.stringify(updatedObject),
        updated_id: token.id,
      },
      {
        where: { id: persist?.id },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackCancelJoinRoom, {
      studentId: req.body.student_id,
      proctorId: persist?.proctor_id,
      roomId: persist?.id,
    });
  }

  return persist;
};

const studentForceLeaveRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
    },
  });

  if (persist?.id) {
    const object = persist?.member_status
      ? JSON.parse(persist.member_status)
      : {};

    const updatedObject = {
      ...object,
      [req.body.student_id]: "3",
    };

    await model.Room.update(
      {
        member_status: JSON.stringify(updatedObject),
        updated_id: token.id,
      },
      {
        where: { id: persist?.id },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackForceLeave, {
      studentId: req.body.student_id,
      proctorId: persist?.proctor_id,
      roomId: persist?.id,
    });
  }

  return persist;
};

module.exports = {
  getRooms,
  getRoomDetail,
  newRoom,
  updateRoom,
  verifyTeacherJoinRoom,
  verifyStudentJoinRoom,
  teacherAcceptRequestJoinRoom,
  teacherRejectRequestJoinRoom,
  studentCancelRequestJoinRoom,
  studentForceLeaveRoom,
};
