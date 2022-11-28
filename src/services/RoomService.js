const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");
const { socketInstance } = require("../socket/instance");
const { SocketEmitter } = require("../socket/keys");
const moment = require("moment");

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
  const rooms = await model.Room.findAll({
    include: [{ model: model.Exam, required: false, where: { deleted: "N" } }],
    where: {
      [Op.or]: [
        {
          group_id: req.body.group_id,
        },
        {
          proctor_id: req.body.proctor_id,
        },
      ],
    },
  });

  const valid = rooms.every((item) => {
    const before = moment(req.body.start_date)
      .add(parseInt(req.body.duration), "minutes")
      .isBefore(moment(item.start_date));
    const after = moment(req.body.start_date).isAfter(
      moment(item.start_date).add(parseInt(item.tb_exam.duration), "minutes")
    );

    return before || after;
  });

  if (!valid) return null;

  const users = await model.User.findAll({
    where: {
      group_id: req.body.group_id,
      deleted: "N",
    },
  });

  const newRoomId = v4();

  const result = await model.Room.create({
    id: newRoomId,
    status: req.body.status,
    title: req.body.title,
    exam_id: req.body.exam_id,
    exam_title: req.body.exam_title,
    group_id: req.body.group_id,
    marked: "N",
    group_title: req.body.group_title,
    proctor_id: req.body.proctor_id,
    proctor_name: req.body.proctor_name,
    start_date: req.body.start_date,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });

  if (users) {
    for (const user of users) {
      await model.UserRoom.create({
        id: v4(),
        user_id: user.id,
        room_id: newRoomId,
        status: 0,
        verified: "N",
        description: "",
        created_id: token.id,
        updated_id: token.id,
        deleted: "N",
      });
    }
  }

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

const teacherJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.id,
      deleted: "N",
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

const studentJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
      deleted: "N",
    },
  });

  if (persist.status === "1") {
    await model.UserRoom.update(
      {
        status: "1",
        updated_id: token.id,
      },
      {
        where: {
          room_id: req.body.room_id,
          user_id: token.id,
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

  return null;
};

const teacherAcceptRequestJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
      deleted: "N",
    },
  });

  if (persist?.id) {
    await model.UserRoom.update(
      {
        status: "2",
        updated_id: token.id,
      },
      {
        where: {
          room_id: req.body.room_id,
          user_id: req.body.student_id,
        },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackAcceptJoinRoom, {
      studentId: req.body.student_id,
      proctorId: persist?.proctor_id,
      roomId: persist?.id,
    });

    return persist;
  }

  return null;
};

const teacherRejectRequestJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
      deleted: "N",
    },
  });

  if (persist?.id) {
    await model.UserRoom.update(
      {
        status: "0",
        updated_id: token.id,
      },
      {
        where: {
          room_id: req.body.room_id,
          user_id: req.body.student_id,
        },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackRejectJoinRoom, {
      studentId: req.body.student_id,
      proctorId: persist?.proctor_id,
      roomId: persist?.id,
    });

    return persist;
  }

  return null;
};

const studentCancelRequestJoinRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
      deleted: "N",
    },
  });

  if (persist?.id) {
    await model.UserRoom.update(
      {
        status: "0",
        updated_id: token.id,
      },
      {
        where: {
          room_id: req.body.room_id,
          user_id: token.id,
        },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackCancelJoinRoom, {
      studentId: req.body.student_id,
      proctorId: persist?.proctor_id,
      roomId: persist?.id,
    });

    return persist;
  }

  return null;
};

const hardSubmission = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
      deleted: "N",
    },
  });

  if (persist?.id) {
    await model.UserRoom.update(
      {
        status: "3",
        description: req.body.description ?? "",
        updated_id: token.id,
      },
      {
        where: {
          room_id: req.body.room_id,
          user_id: req.body.student_id,
        },
      }
    );

    await model.Notification.create({
      id: v4(),
      user_id: req.body.student_id,
      title: "Buộc nộp bài",
      content: req.body.description ?? "",
      created_id: token.id,
      updated_id: token.id,
      deleted: "N",
    });

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackForceLeave, {
      studentId: req.body.student_id,
      proctorId: persist?.proctor_id,
      description: req.body.description ?? "",
      roomId: persist?.id,
    });

    return persist;
  }

  return null;
};

const pointingRoom = async ({ req, token }) => {
  const { group_id, exam_id, room_id } = req.body;

  const members = await model.User.findAll({
    where: { group_id: group_id, deleted: "N" },
  });

  const questions = await model.ExamQuestion.findAll({
    include: [
      {
        model: model.Question,
        required: false,
        where: { deleted: "N" },
        include: [
          { model: model.Answer, required: false, where: { deleted: "N" } },
        ],
      },
    ],
    where: {
      exam_id: exam_id,
      deleted: "N",
    },
  });

  const results = await model.Result.findAll({
    where: {
      room_id: room_id,
      deleted: "N",
    },
  });

  for (const member of members) {
    const resultBelongToMember = results.filter(
      (item) => item.created_id === member.id
    );

    const point = questions.reduce((sum, question) => {
      const questionDetail = question?.tb_question ?? {};

      const resultBelongToQuestion = resultBelongToMember.filter(
        (item) => item.question_id === questionDetail?.id
      );

      const correctAnswers = (questionDetail?.tb_answers ?? []).flatMap(
        (item) => (parseInt(item.percent) > 0 ? [item.id] : [])
      );

      const isCorrect =
        resultBelongToQuestion.length === correctAnswers.length &&
        resultBelongToQuestion.every((item) =>
          correctAnswers.includes(item.selected_answer_id)
        );
      const point = !isNaN(questionDetail?.point)
        ? parseFloat(questionDetail?.point)
        : 0;

      return isCorrect ? sum + point : sum;
    }, 0);

    await model.Mark.create({
      id: v4(),
      user_id: member.id,
      room_id: room_id,
      mark: point,
      created_id: token.id,
      updated_id: token.id,
      deleted: "N",
    });

    await model.Room.update(
      {
        marked: "Y",
        updated_id: token.id,
      },
      {
        where: { id: room_id },
      }
    );
  }

  return true;
};

const closeRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
      deleted: "N",
    },
  });

  if (persist.id) {
    const members = await model.UserRoom.findAll({
      where: {
        status: { [Op.in]: ["2", "3"] },
        room_id: req.body.room_id,
      },
    });

    await model.UserRoom.update(
      {
        status: "3",
        updated_id: token.id,
      },
      {
        where: {
          status: { [Op.in]: ["2", "3"] },
          room_id: req.body.room_id,
        },
      }
    );

    await model.Room.update(
      {
        status: "2",
        updated_id: token.id,
      },
      {
        where: { id: persist.id },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackCloseRoom, {
      roomId: persist.id,
      studentIds: members.map((item) => item.user_id),
    });

    return persist;
  }

  return null;
};

const teacherOpenRoom = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
      deleted: "N",
    },
  });

  if (persist.id) {
    await model.Room.update(
      {
        teacher_start_date: new Date().toISOString(),
        updated_id: token.id,
      },
      {
        where: { id: persist.id },
      }
    );

    const members = await model.UserRoom.findAll({
      where: {
        status: "2",
        room_id: req.body.room_id,
      },
    });

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackOpenRoom, {
      roomId: persist.id,
      studentIds: members.map((item) => item.user_id),
    });

    return persist;
  }

  return null;
};

const studentSubmit = async ({ req, token }) => {
  const persist = await model.Room.findOne({
    where: {
      id: req.body.room_id,
      deleted: "N",
    },
  });

  if (persist.id) {
    await model.UserRoom.update(
      {
        status: "3",
        updated_id: token.id,
      },
      {
        where: {
          room_id: req.body.room_id,
          user_id: token.id,
        },
      }
    );

    socketInstance.getIO().emit(SocketEmitter.serverFeedbackStudentSubmit, {
      roomId: persist.id,
      proctorId: persist.proctor_id,
    });

    return persist;
  }

  return null;
};

module.exports = {
  getRooms,
  getRoomDetail,
  newRoom,
  updateRoom,
  teacherJoinRoom,
  studentJoinRoom,
  teacherAcceptRequestJoinRoom,
  teacherRejectRequestJoinRoom,
  studentCancelRequestJoinRoom,
  hardSubmission,
  pointingRoom,
  closeRoom,
  teacherOpenRoom,
  studentSubmit,
};
