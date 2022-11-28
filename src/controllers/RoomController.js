const router = require("express").Router();
const {
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
} = require("../services/RoomService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/student-submit", wrapper(studentSubmit));
router.post("/open-room", wrapper(teacherOpenRoom));
router.post("/close-room", wrapper(closeRoom));
router.post("/pointing-room", wrapper(pointingRoom));
router.post("/force-leave", wrapper(hardSubmission));
router.post("/teacher-accept-request", wrapper(teacherAcceptRequestJoinRoom));
router.post("/teacher-reject-request", wrapper(teacherRejectRequestJoinRoom));
router.post("/student-cancel-request", wrapper(studentCancelRequestJoinRoom));
router.post("/teacher-join", wrapper(teacherJoinRoom));
router.post("/student-join", wrapper(studentJoinRoom));
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
