const router = require("express").Router();
const {
  getUserRooms,
  getUserRoomById,
} = require("../services/UserRoomService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

/*
 ** 2. Update endpoints
 */

/*
 ** 3. Get endpoints
 */

router.get("/:id", wrapper(getUserRoomById));
router.get("/", wrapper(getUserRooms));

module.exports = router;
