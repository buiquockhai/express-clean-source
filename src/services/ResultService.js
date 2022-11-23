const { v4 } = require("uuid");
const { Op } = require("sequelize");
const model = require("../models");
const { socketInstance } = require("../socket/instance");
const { SocketEmitter } = require("../socket/keys");

const getResults = async ({ req }) => {
  const result = await model.Result.findAll({
    include: [
      {
        model: model.Question,
        include: [{ model: model.Answer }],
      },
      { model: model.User },
    ],
    where: {
      ...req?.query,
      deleted: "N",
    },
    order: [["created_date", "DESC"]],
  });
  return result;
};

const getResultDetail = async ({ req }) => {
  const result = await model.Result.findOne({
    include: [
      { model: model.Question, include: [{ model: model.Answer }] },
      { model: model.User },
    ],
    where: {
      id: req.params.id,
      deleted: "N",
    },
  });
  return result;
};

const newResult = async ({ req, token }) => {
  const result = await model.Result.create({
    id: v4(),
    room_id: req.body.room_id,
    selected_answer_id: req.body.selected_answer_id,
    selected_answer_label: req.body.selected_answer_label,
    question_id: req.body.question_id,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });

  socketInstance.getIO().emit(SocketEmitter.serverFeedbackUpdateAnswer, {
    studentId: token.id,
    roomId: req.body.room_id,
    proctorId: req.body.proctor_id,
  });

  return result;
};

const updateResult = async ({ req, token }) => {
  const { id, proctor_id, ...rest } = req.body;
  const result = await model.Result.update(
    {
      ...rest,
      updated_id: token.id,
    },
    {
      where: { id: { [Op.in]: [id].flat() } },
    }
  );

  socketInstance.getIO().emit(SocketEmitter.serverFeedbackUpdateAnswer, {
    studentId: token.id,
    roomId: req.body.room_id,
    proctorId: proctor_id,
  });

  return result;
};

const pushResult = async ({ req, token }) => {
  const persist = await model.Result.findOne({
    where: {
      room_id: req.body.room_id,
      question_id: req.body.question_id,
      created_id: token.id,
    },
  });

  if (persist?.id) {
    await model.Result.update(
      {
        selected_answer_id: req.body.selected_answer_id,
        selected_answer_label: req.body.selected_answer_label,
        updated_id: token.id,
      },
      {
        where: { id: persist?.id },
      }
    );
  } else {
    await model.Result.create({
      id: v4(),
      room_id: req.body.room_id,
      selected_answer_id: req.body.selected_answer_id,
      selected_answer_label: req.body.selected_answer_label,
      question_id: req.body.question_id,
      created_id: token.id,
      updated_id: token.id,
      deleted: "N",
    });
  }

  socketInstance.getIO().emit(SocketEmitter.serverFeedbackUpdateAnswer, {
    studentId: token.id,
    roomId: req.body.room_id,
    proctorId: req.body.proctor_id,
  });

  return true;
};

module.exports = {
  getResults,
  getResultDetail,
  newResult,
  updateResult,
  pushResult,
};
