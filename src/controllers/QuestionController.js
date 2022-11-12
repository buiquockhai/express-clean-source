const router = require("express").Router();
const {
  getQuestions,
  getQuestionDetail,
  newFolder,
  getFolders,
  updateFolder,
  newQuestion,
} = require("../services/QuestionService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/folder", wrapper(newFolder));
router.post("/question", wrapper(newQuestion));

/*
 ** 2. Update endpoints
 */

router.put("/folder", wrapper(updateFolder));

/*
 ** 3. Get endpoints
 */

router.get("/folder", wrapper(getFolders));
router.get("/:id", wrapper(getQuestionDetail));
router.get("/", wrapper(getQuestions));

module.exports = router;
