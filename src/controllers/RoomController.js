const router = require("express").Router();
const {
  getRooms,
  getRoomDetail,
  newRoom,
  updateRoom,
  verifyTeacherJoinRoom,
  verifyStudentJoinRoom,
} = require("../services/RoomService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/teacher-join", wrapper(verifyTeacherJoinRoom));
router.post("/student-join", wrapper(verifyStudentJoinRoom));
router.post("/", wrapper(newRoom));

/*
 ** 2. Update endpoints
 */

router.put("/", wrapper(updateRoom));

/*
 ** 3. Get endpoints
 */

router.get("/:id", wrapper(getRoomDetail));
router.get("/", wrapper(getRooms));

module.exports = router;
