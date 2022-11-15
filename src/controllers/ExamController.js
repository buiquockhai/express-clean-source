const router = require("express").Router();
const {
  getExams,
  getExamDetail,
  newExam,
  updateExam,
} = require("../services/ExamService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/", wrapper(newExam));

/*
 ** 2. Update endpoints
 */

router.put("/", wrapper(updateExam));

/*
 ** 3. Get endpoints
 */

router.get("/:id", wrapper(getExamDetail));
router.get("/", wrapper(getExams));

module.exports = router;
