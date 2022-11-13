const { v4 } = require("uuid");
const model = require("../models");

const getNotifications = async ({ _, token }) => {
  const result = await model.Notification.findAll({
    where: {
      deleted: "N",
      user_id: token.id,
    },
  });
  return result;
};

const newNotification = async ({ req, token }) => {
  const result = await model.Notification.create({
    id: v4(),
    user_id: req.body.user_id,
    title: req.body.title,
    content: req.body.content,
    created_id: token.id,
    updated_id: token.id,
    deleted: "N",
  });
  return result;
};

module.exports = {
  getNotifications,
  newNotification,
};
