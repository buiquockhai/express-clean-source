const model = require("../models");

const getUserRooms = async ({ req }) => {
  const result = await model.UserRoom.findAll({
    order: [["created_date", "DESC"]],
    include: [{ model: model.User, required: false, where: { deleted: "N" } }],
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

module.exports = {
  getUserRooms,
  getUserRoomById,
};
