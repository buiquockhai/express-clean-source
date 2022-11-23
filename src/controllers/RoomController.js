const router = require("express").Router();
const {
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
} = require("../services/RoomService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/force-leave", wrapper(studentForceLeaveRoom));
router.post("/teacher-accept-request", wrapper(teacherAcceptRequestJoinRoom));
router.post("/teacher-reject-request", wrapper(teacherRejectRequestJoinRoom));
router.post("/student-cancel-request", wrapper(studentCancelRequestJoinRoom));
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
