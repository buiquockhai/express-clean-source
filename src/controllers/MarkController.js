const router = require("express").Router();
const {
  getMarks,
  getMarkDetail,
  newMark,
  updateMark,
} = require("../services/MarkService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/", wrapper(newMark));

/*
 ** 2. Update endpoints
 */

router.put("/", wrapper(updateMark));

/*
 ** 3. Get endpoints
 */

router.get("/:id", wrapper(getMarkDetail));
router.get("/", wrapper(getMarks));

module.exports = router;
