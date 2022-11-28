const router = require("express").Router();
const {
  getUserRooms,
  getUserRoomById,
  kickOutRoom,
  teacherAuthStudent,
  verifyLoadRoom,
} = require("../services/UserRoomService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/auth-student", wrapper(teacherAuthStudent));
router.post("/kick-out", wrapper(kickOutRoom));
router.post("/verify-join-room", wrapper(verifyLoadRoom));

/*
 ** 2. Update endpoints
 */

/*
 ** 3. Get endpoints
 */

router.get("/:id", wrapper(getUserRoomById));
router.get("/", wrapper(getUserRooms));

module.exports = router;
