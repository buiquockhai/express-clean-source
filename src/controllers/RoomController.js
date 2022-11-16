const router = require("express").Router();
const {
  getRooms,
  getRoomDetail,
  newRoom,
  updateRoom,
} = require("../services/RoomService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

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
